-- Update koordinat Pasar Tebet Barat
UPDATE public.markets 
SET lat = -6.244342, 
    lng = 106.848202, 
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=-6.244342,106.848202'
WHERE id = 'd7328ebc-a19c-4667-a837-b6909d79ad51' OR slug = 'pasar-tebet-barat' OR name = 'Pasar Tebet Barat';

-- Update koordinat Pasar PSPT Tebet
UPDATE public.markets 
SET lat = -6.236686, 
    lng = 106.857361, 
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=-6.236686,106.857361'
WHERE id = '864f9325-ce63-43c9-8b37-d35f7351c985' OR slug = 'pasar-pspt-tebet' OR name = 'Pasar PSPT Tebet';
