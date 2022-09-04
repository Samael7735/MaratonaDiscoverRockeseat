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
    id:0,
    description: 'Luz',
    amount: -50000,
    date: '03/09/2022'
  },
  {
    id:1,
    description: 'Website',
    amount: 20000,
    date: '03/09/2022'
  },
  {
    id:2,
    description: 'Website',
    amount: 20000,
    date: '03/09/2022'
  },
  {
    id:3,
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

Transaction.add({
  id: 2,
  description:"aaaa",
  amount: 300,
  date: "02/12/1222"
})

