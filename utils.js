// utils.js
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const readableNumber = n => new Intl.NumberFormat('fa-IR').format(n ?? 0);
const currency = (n, c='ریال') => readableNumber(n) + ' ' + c;
const idGen = (prefix, list) => prefix + '-' + String((list?.length||0)+1).padStart(4,'0');
const saveLS = (k,v) => localStorage.setItem(k, JSON.stringify(v));
const readLS = (k, d=null) => JSON.parse(localStorage.getItem(k)||JSON.stringify(d));
const toast = (msg) => {
  let el = document.createElement('div');
  el.className='fixed bottom-4 right-4 z-[9999] glass rounded-xl px-4 py-2';
  el.textContent = msg;
  document.body.append(el);
  setTimeout(()=> el.remove(), 2500);
};
const downloadFile = (name, content, type='application/json') => {
  const a = document.createElement('a');
  const file = new Blob([content], {type});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
};
