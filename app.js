// app.js
function initApp(){
  db = readLS('nkp-db', defaultData);
  $('#company-name').textContent = db.settings.company;
  applyTheme(db.settings.theme);
  // Sidebar default
  showView('dashboard');
  renderKPIs();
  renderProducts();
  renderCustomers();
  renderInvoices();
  renderInventory();
  renderReports();
  // Actions
  $('#btn-logout').onclick = ()=>{ localStorage.removeItem('nkp-auth'); location.reload(); };
  $('#btn-theme').onclick = ()=>{
    const modes = ['system','light','dark'];
    const idx = modes.indexOf(db.settings.theme);
    db.settings.theme = modes[(idx+1)%modes.length];
    save();
    applyTheme(db.settings.theme);
    toast('تم: ' + db.settings.theme);
  };
  $('#btn-backup').onclick = exportAll;
  $('#btn-save-settings').onclick = ()=>{
    db.settings.company = $('#set-company').value || db.settings.company;
    db.settings.taxRate = parseFloat($('#set-tax').value)||db.settings.taxRate;
    db.settings.theme = $('#set-theme').value;
    db.settings.warehouses = $('#set-warehouses').value.split(',').map(s=>s.trim()).filter(Boolean);
    save();
    $('#company-name').textContent = db.settings.company;
    applyTheme(db.settings.theme);
    toast('تنظیمات ذخیره شد.');
  };
  // Prefill inputs
  $('#set-company').value = db.settings.company;
  $('#set-tax').value = db.settings.taxRate;
  $('#set-theme').value = db.settings.theme;
  $('#set-warehouses').value = db.settings.warehouses.join(',');
}
function save(){ saveLS('nkp-db', db); }
document.addEventListener('DOMContentLoaded', loginInit);
