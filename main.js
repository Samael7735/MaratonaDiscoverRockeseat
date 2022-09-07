let modal = document.getElementById('modal')

function fechar(){
  modal.classList.remove('active')
}
function abrir(){
  modal.classList.add('active')
}
//storage guarda dados
const storage = {
  get(){
    //pega itens armazenados e converte em array
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },
  set(transactions){
    //armazena item e converte em formato json
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
  }
}
//funcionalidades
const Transaction = {
  all: storage.get(),
  add (transaction){
    Transaction.all.push(transaction)
    app.reload()
  },
  remove(index){
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
//DOM
const dom ={
  transactionContainer : document.querySelector('#data_table tbody'),
  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = dom.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index
    
    dom.transactionContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction, index){
    const Cssclas = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
      <tr>
        <td class="description">${transaction.description}</td>
        <td class="${Cssclas}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img id="expenseCursor" onclick= "Transaction.remove(${index}) " src="/assets/minus.svg" alt="remover Transação">
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
//utilidades
const Utils = {
  FormatAmount(value){
    value = Number(value) * 100
    return value
  },
  FormatData(date){
    const splitedDate = date.split("-")
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
  },
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
const Form = {
  description: document.getElementById('description'),
  amount: document.getElementById('amount'),
  date: document.getElementById('data'),

  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  validateField(){
    const {description, amount, date} = Form.getValues()
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
      throw new Error("Por favor, preencha todos os campos")
    }
  },
  FormatValues(){
    let {description, amount, date} = Form.getValues()
    amount = Utils.FormatAmount(amount)
    date = Utils.FormatData(date)

    return {
      description,
      amount,
      date
    }
  },
  clearFields(){
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },
  submit(event){
    event.preventDefault()
    try{
      Form.validateField()
      const transaction = Form.FormatValues()
      Transaction.add(transaction)
      Form.clearFields()
      fechar()
    }catch(error){
      alert(error.message)
    }
  }
}
const app = {
  init(){
    Transaction.all.forEach((transaction, index)=>{ //adiciona as transações já existentes
      dom.addTransaction(transaction, index)
    })
    dom.updateBalance()
    storage.set(Transaction.all)
  },
  reload(){
    dom.clearTransactions()
    app.init()
  }
}
app.init()

//celebre sempre as suas conquistas! Estou orgulhoso por ter chegado até aqui e ciênte que há milhares de degraus até o topo! #neverStopLearning ")
//A vida é construida por uma suceção de momentos e esse pequeno momento está repleto de satisfação!
