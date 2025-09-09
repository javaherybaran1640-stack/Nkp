// auth.js
const defaultData = {
  settings: {company:'NKP Co', taxRate:9, theme:'system', warehouses:['اصلی','شمال']},
  products:[{id:'P-0001', name:'هیومیک اسید', unit:'لیتر', inventory:120, price:50000, pack:'گالنی'}],
  customers:[{id:'C-0001', name:'شرکت الف', phone:'09120000000', lastPurchase: todayISO()}],
  invoices:[],
  inventoryLogs:[]
};
let db = readLS('nkp-db', defaultData);

function applyTheme(mode){
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = mode==='dark' || (mode==='system' && prefersDark);
  root.classList.toggle('dark', dark);
}

function loginInit(){
  $('#btn-login').addEventListener('click', ()=>{
    const u = $('#login-user').value.trim();
    const p = $('#login-pass').value;
    if(u==='admin' && p==='1234'){
      saveLS('nkp-auth', {user:'admin', role:'Admin'});
      $('#login-screen').classList.add('hidden');
      $('#shell').classList.remove('hidden');
      initApp();
      toast('خوش آمدید 👋');
    }else{
      toast('نام کاربری یا رمز عبور اشتباه است.');
    }
  });
  const auth = readLS('nkp-auth');
  if(auth){
    $('#login-screen').classList.add('hidden');
    $('#shell').classList.remove('hidden');
    initApp();
  }
}

