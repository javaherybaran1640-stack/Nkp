// accounting.js
function renderInvoices(){
  const wrap = $('#invoice-list');
  const rows = db.invoices.map(f=>`<tr>
    <td>${f.id}</td><td>${f.date}</td><td>${f.customer||'-'}</td><td>${currency(f.total||0)}</td><td>${f.status||'pending'}</td></tr>`).join('');
  wrap.innerHTML = `<div class="overflow-auto"><table><thead><tr>
  <th>کد</th><th>تاریخ</th><th>مشتری</th><th class="text-left">مبلغ</th><th>وضعیت</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  $('#btn-new-invoice').onclick = newInvoice;
}

function newInvoice(){
  const id = idGen('F', db.invoices);
  const customer = prompt('نام مشتری؟', db.customers[0]?.name || '');
  if(customer===null) return;
  const product = prompt('محصول؟', db.products[0]?.name || '');
  const qty = Number(prompt('تعداد؟', '1')) || 1;
  const item = db.products.find(p => p.name===product) || db.products[0];
  const price = item?.price || 0;
  const tax = db.settings.taxRate || 0;
  const subtotal = qty*price;
  const total = Math.round(subtotal*(1+tax/100));
  const inv = {id, date: todayISO(), customer, lines:[{product:item.name, qty, price}], subtotal, taxRate:tax, total, status:'pending', source:'warehouse'};
  db.invoices.push(inv);
  // inventory decrease
  const prod = db.products.find(p=>p.name===item.name);
  if(prod){ prod.inventory -= qty; db.inventoryLogs = db.inventoryLogs||[]; db.inventoryLogs.push({logId:idGen('L', db.inventoryLogs), productId:prod.id, change:-qty, reason:'sale '+id}); }
  save();
  renderInvoices(); renderInventory(); toast('فاکتور ثبت شد.');
}
