// Katalog produk Risss.clobber.
const PRODUCT_COLOR_HEX={
  Black:'#17181a',
  White:'#ffffff',
  Grey:'#6b6f76',
  Stone:'#dedad2',
  'Charcoal Grey':'#57595e',
  Charcoal:'#36383c',
  Olive:'#687054',
  Navy:'#1d2432',
  Blue:'#2b4c7e',
  'Slate Blue':'#2d3f4a',
  Red:'#e02b27',
  Rose:'#d8a0aa',
  Brown:'#6b5344'
};
function productColorHex(color,customHex){return customHex||PRODUCT_COLOR_HEX[color]||'#dedad2';}
const DEFAULT_PRODUCTS = [
  // Ellesse
  [
    'ell-jacket',
    'Ellesse Jacket',
    'Ellesse',
    'Jackets',
    1299000,
    0,
    'image/products/ell-jacket.webp',
    'Ellesse Jacket',
    ['S',
    'M',
    'L',
    'XL'],
    'Navy',
    10,
    true,
    '#151b54'
  ],
  [
    'ell-tee',
    'Ellesse Tee',
    'Ellesse',
    'T-Shirts',
    450000,
    0,
    'image/products/ell-tee.webp',
    'Ellesse Tee',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    15,
    false,
    '#000000'
  ],
  [
    'ell-polo',
    'Ellesse Polo',
    'Ellesse',
    'Polo Shirts',
    799000,
    0,
    'image/products/ell-polo.webp',
    'Ellesse Polo',
    ['S',
    'M',
    'L',
    'XL'],
    'Navy',
    12,
    false,
    '#1d2432'
  ],
  [
    'ell-sneaker',
    'Ellesse Sneaker',
    'Ellesse',
    'Accessories',
    999000,
    0,
    'image/products/ell-sneaker.webp',
    'Ellesse Sneaker',
    ['EU 39-44'],
    'Gray',
    10,
    false,
    '#52595D'
  ],
  // Stone Island
  [
    'si-jacket',
    'Stone Island Jacket',
    'Stone Island',
    'Jackets',
    5250000,
    0,
    'image/products/si-jacket.webp',
    'Stone Island Jacket',
    ['S',
    'M',
    'L',
    'XL'],
    'Navy',
    8,
    true,
    '#1d2432'
  ],
  [
    'si-jacket-1',
    'Stone Island Jacket 1',
    'Stone Island',
    'Jackets',
    7200000,
    0,
    'image/products/si-jacket-1.webp',
    'Stone Island Jacket 1',
    ['S',
    'M',
    'L',
    'XL'],
    'White-gray',
    8,
    true,
    '#EEEEEE'
  ],
  [
    'si-jacket-2',
    'Stone Island Jacket 2',
    'Stone Island',
    'Jackets',
    7850000,
    0,
    'image/products/si-jacket-2.webp',
    'Stone Island Jacket 2',
    ['S',
    'M',
    'L',
    'XL'],
    'Cream',
    7,
    true,
    '#FFFDD0'
  ],
  [
    'si-jacket-3',
    'Stone Island Jacket 3',
    'Stone Island',
    'Jackets',
    9500000,
    0,
    'image/products/si-jacket-3.webp',
    'Stone Island Jacket 3',
    ['S',
    'M',
    'L',
    'XL'],
    'Cream',
    5,
    true,
    '#feecc8'
  ],
  [
    'si-hoodie',
    'Stone Island Hoodie',
    'Stone Island',
    'Hoodies',
    3450000,
    0,
    'image/products/si-hoodie.webp',
    'Stone Island Hoodie',
    ['S',
    'M',
    'L',
    'XL'],
    'Green',
    10,
    false,
    '#006A4E'
  ],
  [
    'si-hoodie-1',
    'Stone Island Hoodie 1',
    'Stone Island',
    'Hoodies',
    3650000,
    0,
    'image/products/si-hoodie-1.webp',
    'Stone Island Hoodie 1',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    10,
    true,
    '#000000'
  ],
  [
    'si-crewneck-blue',
    'Stone Island Crewneck Blue',
    'Stone Island',
    'Hoodies',
    3250000,
    0,
    'image/products/si-crewneck-blue.avif',
    'Stone Island Crewneck Blue',
    ['S',
    'M',
    'L',
    'XL'],
    'Blue',
    10,
    true,
    '#2b4c7e'
  ],
  [
    'si-crewneck-pink',
    'Stone Island Compass Crewneck Rose Pink',
    'Stone Island',
    'Hoodies',
    3250000,
    0,
    'image/products/si-crewneck-pink.webp',
    'Stone Island Compass Crewneck Rose Pink',
    ['S',
    'M',
    'L',
    'XL'],
    'Rose',
    8,
    true,
    '#d8a0aa'
  ],
  [
    'si-half-zip',
    'Stone Island Half Zip',
    'Stone Island',
    'Hoodies',
    3750000,
    0,
    'image/products/si-half-zip.webp',
    'Stone Island Half Zip',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    8,
    true,
    '#17181a'
  ],
  [
    'si-pants',
    'Stone Island Pants',
    'Stone Island',
    'Trousers',
    2950000,
    0,
    'image/products/si-pants.webp',
    'Stone Island Pants',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    6,
    false,
    '#17181a'
  ],
  [
    'si-tee',
    'Stone Island Tee',
    'Stone Island',
    'T-Shirts',
    1850000,
    0,
    'image/products/si-tee.webp',
    'Stone Island Tee',
    ['S',
    'M',
    'L',
    'XL'],
    'Grey',
    12,
    false,
    '#808080'
  ],
  // C.P. Company
  [
    'cp-jacket',
    'C.P. Company Jacket',
    'C.P. Company',
    'Jackets',
    6250000,
    0,
    'image/products/cp-jacket.webp',
    'C.P. Company Jacket',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    7,
    true,
    '#17181a'
  ],
  [
    'cp-jacket-1',
    'C.P. Company Jacket 1',
    'C.P. Company',
    'Jackets',
    5750000,
    0,
    'image/products/cp-jacket-1.webp',
    'C.P. Company Jacket 1',
    ['S',
    'M',
    'L',
    'XL'],
    'Brown',
    7,
    false,
    '#8B4513'
  ],
  [
    'cp-jacket-2',
    'C.P. Company Jacket 2',
    'C.P. Company',
    'Jackets',
    6450000,
    0,
    'image/products/cp-jacket-2.webp',
    'C.P. Company Jacket 2',
    ['S',
    'M',
    'L',
    'XL'],
    'Grey',
    6,
    false,
    '#808080'
  ],
  [
    'cp-pants',
    'C.P. Company Pants',
    'C.P. Company',
    'Trousers',
    2299000,
    0,
    'image/products/cp-pants.webp',
    'C.P. Company Pants',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    6,
    false,
    '#000000'
  ],
  [
    'cp-polo',
    'C.P. Company Polo',
    'C.P. Company',
    'Polo Shirts',
    1950000,
    0,
    'image/products/cp-polo.webp',
    'C.P. Company Polo',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    9,
    false,
    '#17181a'
  ],
  [
    'cp-tee',
    'C.P. Company Tee',
    'C.P. Company',
    'T-Shirts',
    1450000,
    0,
    'image/products/cp-tee.webp',
    'C.P. Company Tee',
    ['S',
    'M',
    'L',
    'XL'],
    'Grey',
    12,
    false,
    '#808080'
  ],
  [
    'cp-tee-1',
    'C.P. Company Tee 1',
    'C.P. Company',
    'T-Shirts',
    1350000,
    0,
    'image/products/cp-tee-1.webp',
    'C.P. Company Tee 1',
    ['S',
    'M',
    'L',
    'XL'],
    'Navy',
    12,
    false,
    '#000080'
  ],
  // Adidas
  [
    'ad-track',
    'Adidas Track Jacket',
    'Adidas',
    'Jackets',
    1500000,
    0,
    'image/products/ad-track.webp',
    'Adidas Track Jacket',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    14,
    true,
    '#17181a'
  ],
  [
    'ad-tp-oasis',
    'Adidas Oasis Tracktop',
    'Adidas',
    'Jackets',
    1850000,
    0,
    'image/products/ad-tp-oasis.webp',
    'Adidas Oasis Tracktop',
    ['S',
    'M',
    'L',
    'XL'],
    'Blue',
    12,
    false,
    '#2b4c7e'
  ],
  [
    'ad-hoodie',
    'Adidas Hoodie',
    'Adidas',
    'Hoodies',
    899000,
    0,
    'image/products/ad-hoodie.webp',
    'Adidas Hoodie',
    ['S',
    'M',
    'L',
    'XL'],
    'Peach-Orange',
    15,
    false,
    '#FFD580'
  ],
  [
    'ad-tee',
    'Adidas Tee',
    'Adidas',
    'T-Shirts',
    550000,
    0,
    'image/products/ad-tee.webp',
    'Adidas Tee',
    ['S',
    'M',
    'L',
    'XL'],
    'White',
    18,
    false,
    '#ffffff'
  ],
  [
    'ad-tee-1',
    'Adidas Tee 1',
    'Adidas',
    'T-Shirts',
    650000,
    0,
    'image/products/ad-tee-1.webp',
    'Adidas Tee 1',
    ['S',
    'M',
    'L',
    'XL'],
    'Black',
    15,
    false,
    '#000000'
  ],
  [
    'ad-sneaker',
    'Adidas Sneaker',
    'Adidas',
    'Accessories',
    1900000,
    0,
    'image/products/ad-sneaker.webp',
    'Adidas Sneaker',
    ['EU 39-44'],
    'Brown',
    12,
    false,
    '#964B00'
  ],
  [
    'ad-birmingham',
    'Adidas Birmingham',
    'Adidas',
    'Accessories',
    2200000,
    0,
    'image/products/ad-birmingham.webp',
    'Adidas Birmingham',
    ['EU 39-44'],
    'Black',
    10,
    false,
    '#000000'
  ],
  [
    'ad-liverpoll',
    'Adidas Liverpool',
    'Adidas',
    'Accessories',
    2250000,
    0,
    'image/products/ad-liverpoll.webp',
    'Adidas Liverpool',
    ['EU 39-44'],
    'Dark-Green',
    10,
    false,
    '#006400'
  ],
].map(([id,name,brand,category,price,discount,image,description,sizes,color,stock,newArrival,colorHex])=>({
  id,name,brand,category,price,discount,image,localImage:image,description,sizes,color,
  colorHex:productColorHex(color,colorHex),stock,newArrival
}));
let PRODUCTS = DEFAULT_PRODUCTS.map(p=>({...p}));
const ADMIN_PRODUCTS_STORAGE_KEY='risssClobberAdminProducts';
const CATALOG_VERSION_KEY='risssClobberCatalogVersion';
const CATALOG_VERSION='2026-10-31-uploaded-only-v12';
const STORE_WA_NUMBER='6289618625552';
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '\"': '&quot;'
  }[char]));
}

function normalizeOrder(order = {}) {
  const orderNumber = String(order.orderNumber || order.number || '');

  return {
    ...order,
    orderNumber,
    number: orderNumber,
    total: Number(order.total) || 0,
    status: order.status || 'Pending'
  };
}

function buildWhatsAppOrderUrl(order = {}) {
  const id=order.orderNumber||order.number||'-';
  const name=order.customer||order.name||'-';
  const phone=order.phone||'-';
  const address=[order.address,order.city,order.postal].filter(Boolean).join(', ')||'-';
  const itemsText=Array.isArray(order.items)&&order.items.length
    ?order.items.map(i=>`- ${i.name} (${[i.size,i.color].filter(Boolean).join(', ')}) x${i.quantity}`).join('\n')
    :'-';
  const lines=[
    `Halo Risss.clobber, saya ingin konfirmasi pembayaran untuk pesanan ${id}.`,
    '',
    `Nama: ${name}`,
    phone!=='-'?`No. HP: ${phone}`:null,
    '',
    'Pesanan:',
    itemsText,
    '',
    order.subtotal!==undefined?`Subtotal: ${rupiah(order.subtotal)}`:null,
    order.shipping!==undefined?`Pengiriman: ${rupiah(order.shipping)}`:null,
    order.discount?`Diskon Promo: -${rupiah(order.discount)}`:null,
    `Total: ${rupiah(order.total||0)}`,
    order.paymentMethod?`Metode: ${order.paymentMethod}`:null,
    '',
    address!=='-'?`Alamat: ${address}`:null,
    '',
    'Mohon info rekening pembayaran dan instruksi selanjutnya. Terima kasih.'
  ].filter(v=>v!==null).join('\n');
  return `https://wa.me/${STORE_WA_NUMBER}?text=${encodeURIComponent(lines)}`;
}
function statusBadge(status) {
  const safeStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    .includes(status)
    ? status
    : 'Pending';

  return `<span class="badge badge-${safeStatus.toLowerCase()}">${safeStatus}</span>`;
}

function productPrice(product) {
  return product.discount || product.price;
}

function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

const USD_EXCHANGE_RATE = 16000;

function rupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function usd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format((Number(value) || 0) / USD_EXCHANGE_RATE);
}

function dualPrice(value, className = 'price') {
  return `<span class="${className} price-dual">
    <span class="price-idr">${rupiah(value)}</span>
    <span class="price-usd">≈ ${usd(value)} USD</span>
  </span>`;
}
const PRODUCT_LOCAL_FALLBACKS = {
  'si-crewneck-blue':'image/products/si-crewneck-blue.avif'
};
function getProductFolderSrc(p,extension='jpg'){return p?.id?`image/products/${encodeURIComponent(p.id)}.${extension}`:'';}
function getProductFolderCandidates(p){
  if(!p?.id) return [];
  if(p.id==='si-crewneck-blue') return ['image/products/si-crewneck-blue.avif'];
  return [`image/products/${p.id}.webp`,`image/products/${p.id}.png`,`image/products/${p.id}.webp`,`image/products/${p.id}.jpeg`,`image/products/${p.id}.avif`];
}
function getDefaultLocalImage(p){
  if(!p) return '';
  if(p.id==='si-crewneck-blue') return 'image/products/si-crewneck-blue.avif';
  return `image/products/${p.id}.webp`;
}
function getLocalImageForProduct(p){return getProductImgSrc(p)}
function getProductImgSrc(p){
  if(!p) return '';
  return getDefaultLocalImage(p) || p.image || '';
}
function getProductFallbackSrc(p){
  if(!p) return '';
  return getDefaultLocalImage(p);
}
function getProductHeroImgSrc(p){
  if(!p) return '';
  const source=p.image||'';
  if(/^https?:\/\/images\.unsplash\.com\//.test(source)){
    try{
      const url=new URL(source);
      url.searchParams.set('auto','format');
      url.searchParams.set('fit','crop');
      url.searchParams.set('w','1920');
      url.searchParams.set('q','85');
      return url.toString();
    }catch{}
  }
  return getProductImgSrc(p);
}
function safeRead(key,fallback=[]){ try { const value=JSON.parse(localStorage.getItem(key)); return Array.isArray(value)?value:fallback; } catch { return fallback; } }
function save(key,value){ try { localStorage.setItem(key,JSON.stringify(value)); } catch { /* Storage mungkin diblokir pada private mode. */ } }
function loadLocalCatalog(){
  const stored=safeRead(ADMIN_PRODUCTS_STORAGE_KEY,null);
  const currentVersion=localStorage.getItem(CATALOG_VERSION_KEY);

  if(!Array.isArray(stored) || stored.some(p=>!p || typeof p!=='object' || !p.id)){
    save(ADMIN_PRODUCTS_STORAGE_KEY, DEFAULT_PRODUCTS);
    localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
    PRODUCTS = DEFAULT_PRODUCTS.map(p=>({...p}));
    return true;
  }

  // Auto-sync jika versi katalog berubah
  const versionMismatch = currentVersion !== CATALOG_VERSION;
  if(versionMismatch){
    save(ADMIN_PRODUCTS_STORAGE_KEY, DEFAULT_PRODUCTS);
    localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
    PRODUCTS = DEFAULT_PRODUCTS.map(p=>({...p}));
    return true;
  }
  const knownIds = new Set(stored.map(p=>p.id));
  let needsSave = !DEFAULT_PRODUCTS.every(p=>knownIds.has(p.id));

  const updatedStored = stored.filter(p=>DEFAULT_PRODUCTS.some(l=>l.id===p.id)).map(p => {
    const def = DEFAULT_PRODUCTS.find(d => d.id === p.id);
    if (!def) return p;
    if (def.image && p.image !== def.image) {
      p.image = def.image;
      needsSave = true;
    }
    return p;
  });

  const merged = [...updatedStored, ...DEFAULT_PRODUCTS.filter(p => !knownIds.has(p.id))];
  if (needsSave || merged.length !== stored.length) {
    save(ADMIN_PRODUCTS_STORAGE_KEY, merged);
    localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
  }

  PRODUCTS = merged.map(p => {
    const def = DEFAULT_PRODUCTS.find(d => d.id === p.id);
    const color = def ? def.color : (p.color || 'Black');
    const colorHex = def ? def.colorHex : productColorHex(color, p.colorHex);
    const image = (def && def.image) ? def.image : (p.image || '');
    return {
      ...p,
      image,
      color,
      colorHex,
      price: Number(p.price) || 0,
      discount: Number(p.discount) || 0,
      stock: Math.max(0, Number(p.stock) || 0),
      sizes: Array.isArray(p.sizes) ? p.sizes : []
    };
  });
  return true;
}
loadLocalCatalog();

// Katalog dan perubahan admin disimpan di localStorage.
const productsReady=Promise.resolve(true);


