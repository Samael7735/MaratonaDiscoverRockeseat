let modal = document.getElementById('modal')

function fechar(){
  modal.classList.remove('active')
}
function abrir(){
  modal.classList.add('active')
}
//registros
const transactions =[
  {
    description: 'Luz',
    amount: -50000,
    date: '03/09/2022'
  },
  {
    description: 'Website',
    amount: 20000,
    date: '03/09/2022'
  },
  {
    description: 'Website',
    amount: 20000,
    date: '03/09/2022'
  },
  {
    description: 'Internet',
    amount: -50000,
    date: '03/09/2022'
  }
]
//funcionalidades
const Transaction = {
  all: transactions,
  add (transaction){
    Transaction.all.push(transaction)
    app.reload()
  },
  excluir(index){
    Transaction.all.splice(index, 1)
    app.reload()
  },
  incomes(){
    let income = 0;
    Transaction.all.forEach(transaction=>{
      if(transaction.amount > 0){
        income += transaction.amount
      }
    })
    return income;
  },
  expenses(){
    let expense = 0;
    Transaction.all.forEach(transaction=>{
      if(transaction.amount < 0){
        expense += transaction.amount;
      }
    })
    return expense;
  },
  total(){
    return Transaction.incomes() + Transaction.expenses();
  }
}
//utilidades
const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""
    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency : "BRL"
    }) 
    return (signal + value)
  }
}
//DOM
const dom ={
  transactionContainer : document.querySelector('#data_table tbody'),
  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = dom.innerHTMLTransaction(transaction)
    
    dom.transactionContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction){
    const Cssclas = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
      <tr>
        <td class="description">${transaction.description}</td>
        <td class="${Cssclas}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="/assets/minus.svg" alt="remover Transação">
        </td>
      </tr>
    `
    return html
  },

  updateBalance(){
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
  },
  clearTransactions(){
    dom.transactionContainer.innerHTML = ""
  }
}
const Form = {
  description: document.getElementById('description'),
  amount: document.getElementById('amount'),
  date: document.getElementById('data'),

  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      data: Form.date.value,
    }
  },
  validadeField(){
    const {description, amount, date} = Form.getValues()
    if(description.trim() === "" || amount.trim() === "" || date.trim() ===""){
      throw new Error("Por favor, preencha todos os campos")
    }
  },
  submit(event){
    event.preventDefault() 
    try{
      Form.validadeField()
    }catch(error){
      alert(error.message)
    }
  }
}
const app = {
  init(){
    Transaction.all.forEach(transaction => { //adiciona as transações já existentes
      dom.addTransaction(transaction)
    })
    
    dom.updateBalance()
  },
  reload(){
    dom.clearTransactions()
    app.init()
  }
}
app.init()

