const adicionar = document.getElementById('adicionar')
const cancelar = document.getElementById('cancelar')
const salvar = document.getElementById('salvar')

let modal = document.getElementById('modal')

function fechar(){
  modal.classList.remove('active')
}
function abrir(){
  modal.classList.add('active')
}