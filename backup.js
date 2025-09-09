// backup.js
function exportAll(){
  const all = readLS('nkp-db', defaultData);
  downloadFile('nkp-backup.json', JSON.stringify(all, null, 2));
}
