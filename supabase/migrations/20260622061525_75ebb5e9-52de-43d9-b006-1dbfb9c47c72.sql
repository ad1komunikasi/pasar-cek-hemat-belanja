
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('customer','premium','admin','super_admin');
CREATE TYPE public.order_status AS ENUM ('pending_payment','proof_uploaded','verifying','rejected','paid','active','expired');
CREATE TYPE public.payment_method AS ENUM ('transfer','qris','va','ewallet');
CREATE TYPE public.market_type AS ENUM ('tradisional','modern','swalayan');

-- ============ updated_at helper ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  username text UNIQUE,
  email text,
  phone text,
  city text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles self select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles self update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles self insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_roles self read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "user_roles admin read all" ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "user_roles admin manage" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));

-- ============ Auto-create profile + role on signup ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, username)
  VALUES (NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email,'@',1) || '_' || substr(NEW.id::text,1,4))
  ) ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ MARKETS ============
CREATE TABLE public.markets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  address text NOT NULL,
  city text NOT NULL,
  province text,
  lat double precision,
  lng double precision,
  hours text,
  photo_url text,
  type public.market_type NOT NULL DEFAULT 'tradisional',
  google_maps_url text,
  rating numeric(2,1) DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.markets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.markets TO authenticated;
GRANT ALL ON public.markets TO service_role;
ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "markets public read" ON public.markets FOR SELECT USING (true);
CREATE POLICY "markets admin manage" ON public.markets FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));
CREATE TRIGGER trg_markets_updated BEFORE UPDATE ON public.markets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PRODUCTS ============
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  category text NOT NULL,
  unit text NOT NULL DEFAULT 'kg',
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products public read" ON public.products FOR SELECT USING (true);
CREATE POLICY "products admin manage" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PRODUCT PRICES ============
CREATE TABLE public.product_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  market_id uuid NOT NULL REFERENCES public.markets(id) ON DELETE CASCADE,
  price numeric(12,2) NOT NULL,
  recorded_at date NOT NULL DEFAULT CURRENT_DATE,
  source text DEFAULT 'manual',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, market_id, recorded_at)
);
CREATE INDEX idx_prices_product_market_date ON public.product_prices (product_id, market_id, recorded_at DESC);
CREATE INDEX idx_prices_date ON public.product_prices (recorded_at DESC);
GRANT SELECT ON public.product_prices TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_prices TO authenticated;
GRANT ALL ON public.product_prices TO service_role;
ALTER TABLE public.product_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "prices public read" ON public.product_prices FOR SELECT USING (true);
CREATE POLICY "prices admin manage" ON public.product_prices FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));

-- ============ FAVORITES ============
CREATE TABLE public.favorites_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);
GRANT SELECT, INSERT, DELETE ON public.favorites_products TO authenticated;
GRANT ALL ON public.favorites_products TO service_role;
ALTER TABLE public.favorites_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fav_products own" ON public.favorites_products FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.favorites_markets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  market_id uuid NOT NULL REFERENCES public.markets(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, market_id)
);
GRANT SELECT, INSERT, DELETE ON public.favorites_markets TO authenticated;
GRANT ALL ON public.favorites_markets TO service_role;
ALTER TABLE public.favorites_markets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fav_markets own" ON public.favorites_markets FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============ SMART BASKETS ============
CREATE TABLE public.smart_baskets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'Keranjang Saya',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.smart_baskets TO authenticated;
GRANT ALL ON public.smart_baskets TO service_role;
ALTER TABLE public.smart_baskets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "basket own" ON public.smart_baskets FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_basket_updated BEFORE UPDATE ON public.smart_baskets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.basket_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  basket_id uuid NOT NULL REFERENCES public.smart_baskets(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  unit text NOT NULL DEFAULT 'kg',
  quantity numeric(10,2) NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.basket_items TO authenticated;
GRANT ALL ON public.basket_items TO service_role;
ALTER TABLE public.basket_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "basket_items own" ON public.basket_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.smart_baskets b WHERE b.id = basket_id AND b.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.smart_baskets b WHERE b.id = basket_id AND b.user_id = auth.uid()));

-- ============ NOTIFICATIONS ============
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notif own" ON public.notifications FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============ PACKAGES ============
CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price numeric(12,2) NOT NULL,
  duration_days integer NOT NULL,
  description text,
  benefits jsonb DEFAULT '[]'::jsonb,
  sort_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "packages public read" ON public.packages FOR SELECT USING (true);
CREATE POLICY "packages admin manage" ON public.packages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));
CREATE TRIGGER trg_packages_updated BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PAYMENT METHODS ============
CREATE TABLE public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.payment_method NOT NULL,
  name text NOT NULL,
  account_number text,
  account_name text,
  instructions text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_methods TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.payment_methods TO authenticated;
GRANT ALL ON public.payment_methods TO service_role;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pm public read" ON public.payment_methods FOR SELECT USING (is_active = true);
CREATE POLICY "pm admin manage" ON public.payment_methods FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));

-- ============ ORDERS ============
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id uuid NOT NULL REFERENCES public.packages(id),
  recipient_name text NOT NULL,
  recipient_email text NOT NULL,
  recipient_phone text,
  amount numeric(12,2) NOT NULL,
  method public.payment_method NOT NULL,
  payment_method_id uuid REFERENCES public.payment_methods(id),
  proof_url text,
  status public.order_status NOT NULL DEFAULT 'pending_payment',
  admin_note text,
  paid_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders own select" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "orders own insert" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "orders own update proof" ON public.orders FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "orders admin all" ON public.orders FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Order number generator
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n integer; today text; res text;
BEGIN
  today := to_char(now(),'YYYYMMDD');
  SELECT COALESCE(MAX(SUBSTRING(order_number FROM 14)::int),0)+1 INTO n
    FROM public.orders WHERE order_number LIKE 'PSC-'||today||'-%';
  res := 'PSC-'||today||'-'||lpad(n::text,4,'0');
  RETURN res;
END $$;

-- ============ SUBSCRIPTIONS ============
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id uuid NOT NULL REFERENCES public.packages(id),
  order_id uuid REFERENCES public.orders(id),
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sub own read" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "sub admin all" ON public.subscriptions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));

-- ============ ACTIVITY + AUTH LOGS ============
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  meta jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activity own read" ON public.activity_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "activity own insert" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "activity admin read" ON public.activity_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));

CREATE TABLE public.auth_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event text NOT NULL,
  ip text,
  user_agent text,
  success boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.auth_logs TO authenticated;
GRANT ALL ON public.auth_logs TO service_role;
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_logs admin read" ON public.auth_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "auth_logs self insert" ON public.auth_logs FOR INSERT TO authenticated WITH CHECK (true);

-- ============ SEED: Packages ============
INSERT INTO public.packages (name, slug, price, duration_days, description, benefits, sort_order) VALUES
('Free','free',0,3650,'Mulai hemat tanpa biaya','["Harga sembako harian","Bandingkan harga","Smart Basket terbatas","Notifikasi terbatas"]',1),
('Premium','premium',9900,30,'Belanja lebih cerdas tiap bulan','["Unlimited Price Alert","Riwayat Harga 90 Hari","Unlimited Smart Basket","Analitik Penghematan","Prediksi Harga","Favorit tanpa batas","Prioritas Update Data"]',2),
('Tahunan','tahunan',99000,365,'Hemat 17% dengan paket tahunan','["Semua fitur Premium","Hemat Rp19.800/tahun","Prioritas customer support"]',3);

-- ============ SEED: Payment Methods ============
INSERT INTO public.payment_methods (type, name, account_number, account_name, instructions, sort_order) VALUES
('transfer','BCA','1234567890','PT PasarCek Indonesia','Transfer sesuai nominal tepat hingga 3 digit terakhir',1),
('transfer','Mandiri','9876543210','PT PasarCek Indonesia','Transfer sesuai nominal tepat hingga 3 digit terakhir',2),
('qris','QRIS','-','PasarCek','Scan QR code dari aplikasi e-wallet atau mobile banking',3);

-- ============ SEED: Markets (Jakarta) ============
INSERT INTO public.markets (name, slug, address, city, province, lat, lng, hours, type, rating, google_maps_url) VALUES
('Pasar Tanah Abang','pasar-tanah-abang','Jl. Fachrudin, Tanah Abang','Jakarta Pusat','DKI Jakarta',-6.1862,106.8108,'05:00 - 17:00','tradisional',4.4,'https://maps.google.com/?q=Pasar+Tanah+Abang'),
('Pasar Senen','pasar-senen','Jl. Pasar Senen, Senen','Jakarta Pusat','DKI Jakarta',-6.1746,106.8419,'05:00 - 18:00','tradisional',4.2,'https://maps.google.com/?q=Pasar+Senen'),
('Pasar Kramat Jati','pasar-kramat-jati','Jl. Raya Bogor KM 17','Jakarta Timur','DKI Jakarta',-6.2752,106.8657,'04:00 - 17:00','tradisional',4.3,'https://maps.google.com/?q=Pasar+Induk+Kramat+Jati'),
('Pasar Mayestik','pasar-mayestik','Jl. Tebah, Gunung','Jakarta Selatan','DKI Jakarta',-6.2419,106.7942,'06:00 - 19:00','tradisional',4.5,'https://maps.google.com/?q=Pasar+Mayestik'),
('Pasar Minggu','pasar-minggu','Jl. Raya Pasar Minggu','Jakarta Selatan','DKI Jakarta',-6.2841,106.8443,'05:00 - 17:00','tradisional',4.1,'https://maps.google.com/?q=Pasar+Minggu'),
('Pasar Jatinegara','pasar-jatinegara','Jl. Jatinegara Timur','Jakarta Timur','DKI Jakarta',-6.2247,106.8702,'05:00 - 18:00','tradisional',4.2,'https://maps.google.com/?q=Pasar+Jatinegara');

-- ============ SEED: Products ============
INSERT INTO public.products (name, slug, category, unit) VALUES
('Beras Premium','beras-premium','Beras','kg'),
('Beras Medium','beras-medium','Beras','kg'),
('Telur Ayam','telur-ayam','Telur','kg'),
('Daging Ayam','daging-ayam','Daging','kg'),
('Daging Sapi','daging-sapi','Daging','kg'),
('Minyak Goreng','minyak-goreng','Minyak','liter'),
('Gula Pasir','gula-pasir','Bumbu','kg'),
('Garam','garam','Bumbu','kg'),
('Bawang Merah','bawang-merah','Sayur','kg'),
('Bawang Putih','bawang-putih','Sayur','kg'),
('Cabai Merah','cabai-merah','Sayur','kg'),
('Cabai Rawit','cabai-rawit','Sayur','kg'),
('Tomat','tomat','Sayur','kg'),
('Kentang','kentang','Sayur','kg'),
('Wortel','wortel','Sayur','kg'),
('Tepung Terigu','tepung-terigu','Tepung','kg'),
('Susu UHT','susu-uht','Susu','liter'),
('Tahu','tahu','Protein Nabati','kg'),
('Tempe','tempe','Protein Nabati','kg'),
('Ikan Kembung','ikan-kembung','Ikan','kg');

-- ============ SEED: Prices (today + yesterday) for all products x markets ============
DO $$
DECLARE
  p RECORD; m RECORD; base numeric; jitter numeric;
BEGIN
  FOR p IN SELECT id, name FROM public.products LOOP
    base := CASE p.name
      WHEN 'Beras Premium' THEN 15000
      WHEN 'Beras Medium' THEN 12500
      WHEN 'Telur Ayam' THEN 28000
      WHEN 'Daging Ayam' THEN 38000
      WHEN 'Daging Sapi' THEN 135000
      WHEN 'Minyak Goreng' THEN 17000
      WHEN 'Gula Pasir' THEN 16500
      WHEN 'Garam' THEN 8000
      WHEN 'Bawang Merah' THEN 35000
      WHEN 'Bawang Putih' THEN 42000
      WHEN 'Cabai Merah' THEN 55000
      WHEN 'Cabai Rawit' THEN 78000
      WHEN 'Tomat' THEN 12000
      WHEN 'Kentang' THEN 18000
      WHEN 'Wortel' THEN 14000
      WHEN 'Tepung Terigu' THEN 13000
      WHEN 'Susu UHT' THEN 19000
      WHEN 'Tahu' THEN 10000
      WHEN 'Tempe' THEN 11000
      WHEN 'Ikan Kembung' THEN 32000
      ELSE 15000 END;
    FOR m IN SELECT id FROM public.markets LOOP
      -- today
      jitter := (random()*0.16 - 0.08); -- -8% .. +8%
      INSERT INTO public.product_prices (product_id, market_id, price, recorded_at, source)
      VALUES (p.id, m.id, round(base*(1+jitter)/100)*100, CURRENT_DATE, 'seed')
      ON CONFLICT DO NOTHING;
      -- yesterday
      jitter := (random()*0.16 - 0.08);
      INSERT INTO public.product_prices (product_id, market_id, price, recorded_at, source)
      VALUES (p.id, m.id, round(base*(1+jitter)/100)*100, CURRENT_DATE - 1, 'seed')
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;
END $$;
