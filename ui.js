// ui.js
const views = ['dashboard','products','customers','invoices','inventory','reports','settings'];
function showView(id){
  views.forEach(v=> $('#view-'+v).classList.toggle('hidden', v!==id));
  // taskbar active state
  $$('.task').forEach(b=> b.classList.toggle('bg-indigo-500/20', b.dataset.view===id));
  $$('.nav-item').forEach(b=> b.classList.toggle('bg-indigo-500/10', b.dataset.view===id));
}
document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-view]')) showView(e.target.dataset.view);
});
