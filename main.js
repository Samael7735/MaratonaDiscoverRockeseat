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
const transaction = {
  incomes(){
    let income = 0;
    transactions.forEach(transaction=>{
      if(transaction.amount > 0){
        income += transaction.amount
      }
    })
    return income;
  },
  expenses(){
    let expense = 0;
    transactions.forEach(transaction=>{
      if(transaction.amount < 0){
        expense += transaction.amount;
      }
    })
    return expense;
  },
  total(){
    return transaction.incomes() + transaction.expenses();
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
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(transaction.incomes())
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(transaction.expenses())
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(transaction.total())
  }
}

transactions.forEach(function(transaction){
  dom.addTransaction(transaction)
})

dom.updateBalance()
