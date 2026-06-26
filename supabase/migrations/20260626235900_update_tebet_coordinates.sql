-- Update koordinat Pasar Tebet Barat
UPDATE public.markets 
SET lat = -6.2392615, 
    lng = 106.8457964, 
    google_maps_url = 'https://www.google.com/maps?q=Pasar+Tebet+Barat,++Jakarta+Selatan'
WHERE id = 'd7328ebc-a19c-4667-a837-b6909d79ad51' OR slug = 'pasar-tebet-barat' OR name = 'Pasar Tebet Barat';

-- Update koordinat Pasar PSPT Tebet
UPDATE public.markets 
SET lat = -6.236686, 
    lng = 106.857361, 
    google_maps_url = 'https://www.google.com/maps?q=Pasar+PSPT+Tebet,++Jakarta+Selatan'
WHERE id = '864f9325-ce63-43c9-8b37-d35f7351c985' OR slug = 'pasar-pspt-tebet' OR name = 'Pasar PSPT Tebet';

-- Update koordinat Pasar Cipinang Jaya
UPDATE public.markets 
SET google_maps_url = 'https://www.google.com/maps?q=Pasar+Cipinang+Jaya,++Jakarta+Timur'
WHERE id = 'd06c5249-2692-4efc-9ff9-4395ad61c7e7' OR slug = 'pasar-cipinang-jaya' OR name = 'Pasar Cipinang Jaya';
