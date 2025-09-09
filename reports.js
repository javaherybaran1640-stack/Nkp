// reports.js
function renderKPIs(){
  const kpis = [
    {label:'درآمد امروز', value: currency(db.invoices.filter(i=>i.date===todayISO()).reduce((a,b)=>a+(b.total||0),0))},
    {label:'تعداد مشتریان', value: readableNumber(db.customers.length)},
    {label:'محصولات فعال', value: readableNumber(db.products.length)},
    {label:'موجودی کل', value: readableNumber(db.products.reduce((a,b)=>a+(b.inventory||0),0))},
  ];
  $('#kpis').innerHTML = kpis.map(k=>`<div class="card"><div class="text-xs text-slate-500">${k.label}</div><div class="text-xl font-extrabold mt-1">${k.value}</div></div>`).join('');
}

function renderReports(){
  const area = $('#report-area');
  const debtors = db.invoices.filter(i=> (i.status==='pending') );
  const html = `
  <div class="card">
    <div class="subtitle mb-2">حساب‌های پرداخت‌نشده</div>
    <div class="overflow-auto"><table><thead><tr><th>کد</th><th>مشتری</th><th>تاریخ</th><th class="text-left">مبلغ</th></tr></thead>
    <tbody>${debtors.map(d=>`<tr><td>${d.id}</td><td>${d.customer}</td><td>${d.date}</td><td class="text-left">${currency(d.total)}</td></tr>`).join('')}</tbody></table></div>
    <p class="text-xs mt-2 text-slate-500">🔎 تحلیل: ${debtors.length? 'لازم است با مشتریان معوق طی ۷ روز آینده تماس گرفته شود.': 'هیچ بدهی معوقی وجود ندارد.'}</p>
  </div>`;
  area.innerHTML = html;
  $('#btn-export-report').onclick = ()=> downloadFile('report.json', JSON.stringify({generatedAt: new Date().toISOString(), debtors}, null, 2));
  $('#btn-pdf-report').onclick = ()=> window.print();
}
