/* Admin UI prototype. Security must be enforced by a backend/RBAC in production. */
const ADMIN_PRODUCTS_KEY='risssClobberAdminProducts';
const ADMIN_ORDERS_KEY='risssClobberAdminOrders';
const adminRead=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key));return value??fallback;}catch{return fallback;}};
const adminWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
function adminProducts(){return adminRead(ADMIN_PRODUCTS_KEY,PRODUCTS.map(p=>({...p}))).map(p=>({...p,name:String(p.name||''),brand:String(p.brand||''),stock:Math.max(0,Number(p.stock)||0)}));}
function setAdminProducts(items){adminWrite(ADMIN_PRODUCTS_KEY,items);if(typeof loadLocalCatalog==='function')loadLocalCatalog();}
function statusBadge(status){const safeStatus=['Pending','Processing','Shipped','Delivered','Cancelled'].includes(status)?status:'Pending';return `<span class="badge badge-${safeStatus.toLowerCase()}">${safeStatus}</span>`;}
function renderAdminProducts(){const root=document.querySelector('[data-admin-products]');if(!root)return;const items=adminProducts();root.innerHTML=`<div class="admin-panel"><div class="panel-header"><h2>Product Catalogue</h2><button class="button olive" data-add-product>Tambah produk</button></div><div class="table-responsive"><table class="admin-table"><thead><tr><th>Product</th><th>Brand</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>${items.map((p,i)=>`<tr><td><img class="table-img" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}"> ${escapeHtml(p.name)}</td><td>${escapeHtml(p.brand)}</td><td>${rupiah(productPrice(p))}</td><td><input class="admin-stock" data-stock-index="${i}" type="number" min="0" value="${p.stock}"></td><td><div class="action-btns"><button class="btn-sm" data-save-product="${i}">Simpan</button><button class="btn-sm danger" data-delete-product="${i}">Hapus</button></div></td></tr>`).join('')}</tbody></table></div></div>`;root.querySelectorAll('[data-save-product]').forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.saveProduct),stock=Number(root.querySelector(`[data-stock-index="${i}"]`).value);items[i].stock=Number.isFinite(stock)?Math.max(0,Math.floor(stock)):items[i].stock;setAdminProducts(items);renderAdminProducts();});root.querySelectorAll('[data-delete-product]').forEach(btn=>btn.onclick=()=>{if(confirm('Hapus produk ini?')){items.splice(Number(btn.dataset.deleteProduct),1);setAdminProducts(items);renderAdminProducts();}});root.querySelector('[data-add-product]').onclick=()=>{const name=prompt('Nama produk baru:');if(!name||!name.trim())return;const brand=prompt('Brand (contoh: Stone Island, C.P. Company, Adidas, Ellesse):','Risss.clobber')||'Risss.clobber';const priceInput=prompt('Harga produk (IDR, tanpa titik/koma):','899000');const price=Math.max(0,Number(priceInput)||0);const stockInput=prompt('Stok awal:','10');const stock=Math.max(0,Math.floor(Number(stockInput)||0));items.unshift({id:`custom-${Date.now()}`,name:name.trim(),brand:brand.trim(),category:'T-Shirt',price,discount:0,image:'/photo-1521572163474-6864f9cf17ab?w=900',description:`Koleksi casual ${brand.trim()} terkurasi.`,sizes:['S','M','L','XL'],color:'Black',stock,newArrival:true});setAdminProducts(items);renderAdminProducts();if(typeof toast==='function')toast(`Produk ${name.trim()} berhasil ditambahkan.`);};}
function renderAdminOrders(){const root=document.querySelector('[data-admin-orders]');if(!root)return;const orders=adminRead(ADMIN_ORDERS_KEY,[{number:'RC-20261020-8491',customer:'Faris Terracewear',total:2899000,status:'Processing'},{number:'RC-20261019-3205',customer:'Faris Terracewear',total:699000,status:'Shipped'}]).map(normalizeOrder);root.innerHTML=`<div class="admin-panel"><div class="panel-header"><h2>Recent Orders</h2></div><div class="table-responsive"><table class="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Update</th></tr></thead><tbody>${orders.map((o,i)=>`<tr><td>${escapeHtml(o.orderNumber||'')}</td><td>${escapeHtml(o.customer||'')}</td><td>${rupiah(o.total)}</td><td>${statusBadge(o.status)}</td><td><select data-order-status="${i}"><option ${o.status==='Pending'?'selected':''}>Pending</option><option ${o.status==='Processing'?'selected':''}>Processing</option><option ${o.status==='Shipped'?'selected':''}>Shipped</option><option ${o.status==='Delivered'?'selected':''}>Delivered</option><option ${o.status==='Cancelled'?'selected':''}>Cancelled</option></select></td></tr>`).join('')}</tbody></table></div></div>`;root.querySelectorAll('[data-order-status]').forEach(select=>select.onchange=()=>{const idx=Number(select.dataset.orderStatus),target=orders[idx];if(target){target.status=select.value;adminWrite(ADMIN_ORDERS_KEY,orders);try{const custKey='risssClobberOrders',co=JSON.parse(localStorage.getItem(custKey))||[],match=co.find(item=>(item.orderNumber||item.number)===(target.number||target.orderNumber));if(match){match.status=select.value;localStorage.setItem(custKey,JSON.stringify(co));}}catch(e){}}renderAdminOrders();const rev=document.querySelector('[data-admin-revenue]');if(rev){const totalRev=orders.reduce((sum,o)=>sum+(Number(o.total)||0),0);rev.textContent=rupiah(totalRev);}});}
function renderRevenueChart(orders = []) {
  const root = document.querySelector('[data-admin-revenue-chart]');
  if (!root) return;

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));
    return date;
  });

  const totals = days.map((day) => {
    const key = day.toISOString().slice(0, 10);
    return orders
      .filter((order) => {
        const date = order.createdAt || order.created_at;
        return date ? new Date(date).toISOString().slice(0, 10) === key : key === days[6].toISOString().slice(0, 10);
      })
      .reduce((sum, order) => sum + (Number(order.total || order.total_amount) || 0), 0);
  });

  const max = Math.max(...totals, 1);
  const width = 760;
  const height = 230;
  const padding = { top: 20, right: 18, bottom: 32, left: 18 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const points = totals.map((total, index) => ({
    x: padding.left + (chartWidth / 6) * index,
    y: padding.top + chartHeight - (total / max) * chartHeight,
    total
  }));
  const line = points.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `${padding.left},${padding.top + chartHeight} ${line} ${width - padding.right},${padding.top + chartHeight}`;
  const labels = days.map((day) => day.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }));

  root.innerHTML = `<div class="admin-revenue-chart"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik pendapatan tujuh hari terakhir">
    <defs><linearGradient id="adminRevenueGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#5d7051" stop-opacity=".55"/><stop offset="100%" stop-color="#5d7051" stop-opacity="0"/></linearGradient></defs>
    <line class="admin-chart-grid-line" x1="${padding.left}" y1="${padding.top + chartHeight / 2}" x2="${width - padding.right}" y2="${padding.top + chartHeight / 2}"/>
    <line class="admin-chart-grid-line" x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}"/>
    <polygon class="admin-chart-area" points="${area}"/>
    <polyline class="admin-chart-line" points="${line}"/>
    ${points.map((point, index) => `<circle class="admin-chart-point" cx="${point.x}" cy="${point.y}" r="4"><title>${labels[index]} — ${rupiah(point.total)} / ${usd(point.total)}</title></circle>`).join('')}
    ${labels.map((label, index) => `<text class="admin-chart-label" x="${points[index].x}" y="${height - 8}" text-anchor="middle">${label}</text>`).join('')}
  </svg></div>`;
}

function setupAdmin(){renderAdminProducts();renderAdminOrders();const orders=adminRead(ADMIN_ORDERS_KEY,[{number:'RC-20261020-8491',customer:'Faris Terracewear',total:2899000,status:'Processing'},{number:'RC-20261019-3205',customer:'Faris Terracewear',total:699000,status:'Shipped'}]).map(normalizeOrder);const revenue=document.querySelector('[data-admin-revenue]');if(revenue){const totalRev=orders.reduce((sum,o)=>sum+(Number(o.total)||0),0);revenue.textContent=rupiah(totalRev);}const products=adminProducts();const count=document.querySelector('[data-admin-product-count]');if(count)count.textContent=products.length;const orderCount=document.querySelector('[data-admin-order-count]');if(orderCount)orderCount.textContent=orders.length;const lowStock=document.querySelector('[data-admin-lowstock-count]');if(lowStock)lowStock.textContent=products.filter((product)=>Number(product.stock)<=3).length;renderRevenueChart(orders);const r=document.querySelector('#admin-reset-demo');if(r&&!r.dataset.bound){r.dataset.bound='true';r.onclick=()=>typeof resetDemoData==='function'&&resetDemoData();}}

