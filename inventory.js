// inventory.js
function renderInventory(){
  const wrap = $('#inventory-table');
  const rows = db.products.map(p=>`<tr>
    <td>${p.id}</td>
    <td>${p.name}</td>
    <td>${p.unit}</td>
    <td>${readableNumber(p.inventory)}</td>
    <td><button class="btn" data-inc="${p.id}">+</button> <button class="btn" data-dec="${p.id}">-</button></td>
  </tr>`).join('');
  wrap.innerHTML = `<div class="overflow-auto"><table><thead><tr><th>کد</th><th>نام</th><th>واحد</th><th>موجودی</th><th>عملیات</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  wrap.onclick = (e)=>{
    const id = e.target.dataset.inc || e.target.dataset.dec;
    if(!id) return;
    const prod = db.products.find(p=>p.id===id);
    if(!prod) return;
    const delta = e.target.dataset.inc ? 1 : -1;
    prod.inventory += delta;
    db.inventoryLogs.push({logId:idGen('L', db.inventoryLogs), productId:prod.id, change:delta, reason: delta>0 ? 'manual in' : 'manual out'});
    save(); renderInventory();
  };
}
