export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function publicProduct(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand_name,
    brandId: row.brand_id,
    category: row.category_name,
    categoryId: row.category_id,
    price: Number(row.price),
    discountPrice: Number(row.discount_price || 0),
    color: row.primary_color,
    description: row.description,
    image: row.image_url,
    isNew: row.is_new_arrival,
    isBestSeller: row.is_best_seller,
    stock: Number(row.total_stock),
    sizes: row.sizes || []
  };
}

export function makeOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `RC-${date}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function numeric(value, fallback = 0) {
  const result = Number(value);
  return Number.isFinite(result) ? result : fallback;
}
