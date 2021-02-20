const form = document.getElementById('form');
const store = document.getElementById('store');
const medicine = document.getElementById('medicine');
const desc = document.getElementById('desc');


form.addEventListener('submit' e =>{
  e.preventDefault();

});




function checkInputs() {
  // trim to remove the whitespaces
  const storeValue = username.value.trim();
  const medicineValue = store.value.trim();
  const descValue = desc.value.trim();
  
  
  if(storeValue === '') {
    setErrorFor(store, 'Store name cannot be blank');
  } else {
    setSuccessFor(username);
  }
  
  if(medicineValue === '') {
    setErrorFor(medicine, 'medicine name cannot be blank');
  }
  } else {
    setSuccessFor(medicine);
  }
  
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
  

