// customers.js
function renderCustomers(list = db.customers){
  const wrap = $('#customer-table');
  wrap.innerHTML = `<div class="overflow-auto"><table><thead><tr>
  <th>کد</th><th>نام</th><th>شماره</th><th>آخرین خرید</th></tr></thead><tbody>
  ${list.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.phone}</td><td>${c.lastPurchase||'-'}</td></tr>`).join('')}
  </tbody></table></div>`;
  $('#customer-search').oninput = (e)=>{
    const q = e.target.value.trim();
    const flt = db.customers.filter(c => [c.name, c.phone, c.lastPurchase].join(' ').includes(q));
    renderCustomers(flt);
  };
  $('#btn-add-customer').onclick = ()=>{
    const id = idGen('C', db.customers);
    const item = {id, name:'مشتری جدید', phone:'0', lastPurchase: todayISO()};
    db.customers.push(item); save(); renderCustomers();
  };
  $('#btn-export-customers').onclick = ()=> downloadFile('customers.json', JSON.stringify(db.customers, null, 2));
}
