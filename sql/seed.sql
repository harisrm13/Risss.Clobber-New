-- Risss.clobber - seed katalog lokal terbaru
-- Jalankan setelah schema.sql di database risss_clobber.

INSERT INTO brands (id, slug, name, country, description) VALUES
(1,'stone-island','Stone Island','Italy','Technical casualwear.'),
(2,'cp-company','C.P. Company','Italy','Utilitarian sportswear.'),
(3,'adidas','Adidas','Germany','Classic sportswear.'),
(4,'ellesse','Ellesse','Italy','Retro sportswear.')
ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug,name=EXCLUDED.name,country=EXCLUDED.country,description=EXCLUDED.description;

INSERT INTO categories (id, slug, name, description) VALUES
(1,'jacket','Jackets','Jackets and outerwear.'),(2,'t-shirt','T-Shirts','T-shirts.'),(3,'polo','Polo Shirts','Polo shirts.'),(4,'hoodie','Hoodies','Hoodies and sweatshirts.'),(5,'pants','Trousers','Trousers and pants.'),(6,'sneakers','Accessories','Shoes and accessories.')
ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug,name=EXCLUDED.name,description=EXCLUDED.description;

INSERT INTO products (id,name,brand_id,category_id,price,discount_price,primary_color,description,image_url,is_new_arrival,is_best_seller,total_stock) VALUES
('ell-jacket','Ellesse Jacket',4,1,1299000,0,'Olive','Ellesse Jacket','/image/products/ell-jacket.webp',true,false,10),
('ell-tee','Ellesse Tee',4,2,450000,0,'White','Ellesse Tee','/image/products/ell-tee.webp',false,false,15),
('ell-polo','Ellesse Polo',4,3,799000,0,'Navy','Ellesse Polo','/image/products/ell-polo.webp',false,false,12),
('ell-sneaker','Ellesse Sneaker',4,6,999000,0,'White','Ellesse Sneaker','/image/products/ell-sneaker.webp',false,false,10),
('si-jacket','Stone Island Jacket',1,1,5250000,0,'Grey','Stone Island Jacket','/image/products/si-jacket.webp',true,false,8),
('si-jacket-1','Stone Island Jacket 1',1,1,7200000,0,'Black','Stone Island Jacket 1','/image/products/si-jacket-1.webp',true,false,8),
('si-jacket-2','Stone Island Jacket 2',1,1,7850000,0,'Grey','Stone Island Jacket 2','/image/products/si-jacket-2.webp',true,false,7),
('si-jacket-3','Stone Island Jacket 3',1,1,9500000,0,'Black','Stone Island Jacket 3','/image/products/si-jacket-3.webp',true,false,5),
('si-hoodie','Stone Island Hoodie',1,4,3450000,0,'Grey','Stone Island Hoodie','/image/products/si-hoodie.webp',false,false,10),
('si-hoodie-1','Stone Island Hoodie 1',1,4,3650000,0,'Grey','Stone Island Hoodie 1','/image/products/si-hoodie-1.webp',true,false,10),
('si-crewneck-blue','Stone Island Crewneck Blue',1,4,3250000,0,'Blue','Stone Island Crewneck Blue','/image/products/si-crewneck-blue.avif',true,false,10),
('si-crewneck-pink','Stone Island Compass Crewneck Rose Pink',1,4,3250000,0,'Rose','Stone Island Compass Crewneck Rose Pink','/image/products/si-crewneck-pink.webp',true,false,8),
('si-half-zip','Stone Island Half Zip',1,4,3750000,0,'Black','Stone Island Half Zip','/image/products/si-half-zip.webp',true,false,8),
('si-pants','Stone Island Pants',1,5,2950000,0,'Black','Stone Island Pants','/image/products/si-pants.webp',false,false,6),
('si-tee','Stone Island Tee',1,2,1850000,0,'Stone','Stone Island Tee','/image/products/si-tee.webp',false,false,12),
('cp-jacket','C.P. Company Jacket',2,1,6250000,0,'Black','C.P. Company Jacket','/image/products/cp-jacket.webp',true,false,7),
('cp-jacket-1','C.P. Company Jacket 1',2,1,5750000,0,'Black','C.P. Company Jacket 1','/image/products/cp-jacket-1.webp',false,false,7),
('cp-jacket-2','C.P. Company Jacket 2',2,1,6450000,0,'Olive','C.P. Company Jacket 2','/image/products/cp-jacket-2.webp',false,false,6),
('cp-pants','C.P. Company Pants',2,5,2299000,0,'Stone','C.P. Company Pants','/image/products/cp-pants.webp',false,false,6),
('cp-polo','C.P. Company Polo',2,3,1950000,0,'Black','C.P. Company Polo','/image/products/cp-polo.webp',false,false,9),
('cp-tee','C.P. Company Tee',2,2,1450000,0,'White','C.P. Company Tee','/image/products/cp-tee.webp',false,false,12),
('cp-tee-1','C.P. Company Tee 1',2,2,1350000,0,'White','C.P. Company Tee 1','/image/products/cp-tee-1.webp',false,false,12),
('ad-track','Adidas Track Jacket',3,1,1500000,0,'Black','Adidas Track Jacket','/image/products/ad-track.webp',true,false,14),
('ad-tp-oasis','Adidas Oasis Tracktop',3,1,1850000,0,'Blue','Adidas Oasis Tracktop','/image/products/ad-tp-oasis.webp',false,false,12),
('ad-hoodie','Adidas Hoodie',3,4,899000,0,'Grey','Adidas Hoodie','/image/products/ad-hoodie.webp',false,false,15),
('ad-tee','Adidas Tee',3,2,550000,0,'White','Adidas Tee','/image/products/ad-tee.webp',false,false,18),
('ad-tee-1','Adidas Tee 1',3,2,650000,0,'White','Adidas Tee 1','/image/products/ad-tee-1.webp',false,false,15),
('ad-sneaker','Adidas Sneaker',3,6,1900000,0,'Grey','Adidas Sneaker','/image/products/ad-sneaker.webp',false,false,12),
('ad-birmingham','Adidas Birmingham',3,6,2200000,0,'Brown','Adidas Birmingham','/image/products/ad-birmingham.webp',false,false,10),
('ad-liverpoll','Adidas Liverpool',3,6,2250000,0,'Red','Adidas Liverpool','/image/products/ad-liverpoll.webp',false,false,10)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name,brand_id=EXCLUDED.brand_id,category_id=EXCLUDED.category_id,price=EXCLUDED.price,discount_price=EXCLUDED.discount_price,primary_color=EXCLUDED.primary_color,description=EXCLUDED.description,image_url=EXCLUDED.image_url,is_new_arrival=EXCLUDED.is_new_arrival,total_stock=EXCLUDED.total_stock;

DELETE FROM products WHERE id NOT IN ('ell-jacket','ell-tee','ell-polo','ell-sneaker','si-jacket','si-jacket-1','si-jacket-2','si-jacket-3','si-hoodie','si-hoodie-1','si-crewneck-blue','si-crewneck-pink','si-half-zip','si-pants','si-tee','cp-jacket','cp-jacket-1','cp-jacket-2','cp-pants','cp-polo','cp-tee','cp-tee-1','ad-track','ad-tp-oasis','ad-hoodie','ad-tee','ad-tee-1','ad-sneaker','ad-birmingham','ad-liverpoll');

DELETE FROM product_sizes;
INSERT INTO product_sizes (product_id,size_label,stock)
SELECT p.id, s.size_label, GREATEST(1, FLOOR(p.total_stock / 4))
FROM products p
CROSS JOIN LATERAL unnest(CASE WHEN p.category_id=6 THEN ARRAY['EU 39-44'] ELSE ARRAY['S','M','L','XL'] END) AS s(size_label);

SELECT COUNT(*) AS seeded_products FROM products;
SELECT id,name,image_url FROM products ORDER BY id;