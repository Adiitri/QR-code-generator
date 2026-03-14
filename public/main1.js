
const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const exportBtn = document.getElementById('exportBtn');
const successMessage = document.getElementById('successMessage');

console.log("Hi");
// for the 'Generate QR Code' btn
generateBtn.addEventListener('click',generateAction);

const qrCode = document.getElementById('qrCode');
function generateAction(){
  const url=urlInput.value.trim();
  urlInput.innerHTML='';
  qrCode.innerHTML='';
if(!url){
  alert('Enter a valid link');
  return;
} 
}
// console.log(chk);

let chk=document.getElementById('textchk').innerText.trim()==="QR Code image will appear here";
// console.log(chk);
if(!chk){
  const exportBtn = document.getElementById("exportBtn");
  exportBtn.disabled = false;
  console.log("false");
}

exportBtn.addEventListener('click',generateExport);
function generateExport(){
  let text=document.getElementById('textchk');
  window.location.href = `/export?text=${encodeURIComponent(text)}`;

}