// products.js
function renderProducts(list = db.products){
  const wrap = $('#product-table');
  const rows = list.map(p=>`<tr>
    <td>${p.id}</td>
    <td>${p.name}</td>
    <td>${p.pack||'-'}</td>
    <td><div class="w-28 h-2 bg-slate-200/60 rounded"><div style="width:${Math.min(100, p.inventory)}%" class="h-2 rounded bg-green-500"></div></div> ${readableNumber(p.inventory)}</td>
    <td class="text-left">${currency(p.price)}</td>
  </tr>`).join('');
  wrap.innerHTML = `<div class="overflow-auto"><table><thead><tr>
    <th>کد</th><th>نام</th><th>بسته‌بندی</th><th>موجودی</th><th class="text-left">قیمت</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  $('#product-search').oninput = (e)=>{
    const q = e.target.value.trim();
    const flt = db.products.filter(p => [p.name, p.pack].join(' ').includes(q));
    renderProducts(flt);
  };
  $('#btn-add-product').onclick = ()=>{
    const id = idGen('P', db.products);
    const item = {id, name:'محصول جدید', unit:'عدد', inventory:0, price:0, pack:'-' };
    db.products.push(item); save(); renderProducts();
  };
  $('#btn-export-products').onclick = ()=> downloadFile('products.json', JSON.stringify(db.products, null, 2));
  $('#btn-import-products').onclick = ()=> $('#file-import-products').click();
  $('#file-import-products').onchange = (e)=>{
    const file = e.target.files[0]; if(!file) return;
    file.text().then(t=>{ try{
      const arr = JSON.parse(t); if(Array.isArray(arr)){ db.products = arr; save(); renderProducts(); toast('وارد شد.'); }
      else toast('فرمت نادرست است');
    }catch{ toast('خطا در خواندن فایل'); } });
  };
}
