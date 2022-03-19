'use strict'

// variaveis
 let modal = document.getElementById('modal');
 let nome = document.getElementById('nome');
 let email = document.getElementById('email');
 let tel = document.getElementById('tel');
 let cidade = document.getElementById('cidade');
 let form = document.getElementById('form');
 let cancelar = document.getElementById('cancelar');
 let posCliente = 0;


//lendo o modal e passando ação de abrir e fechar
const openmodal = ()=> modal.classList.add('active');
const closemodal = () =>{
   modal.classList.remove('active');
  clearFields();
 }


 //criando metódo para acessar localStorage
 const getLocalStorage = () => JSON.parse(localStorage.getItem('clientes')) ?? [];
 const setLocalStorage = (listClient) =>localStorage.setItem('clientes' ,JSON.stringify(listClient));



// CRUD create  read update delete

const updateClient = (index,cliente) => {  //alterar o cliente
    posCliente = getLocalStorage();
   posCliente[index] = cliente;
   setLocalStorage(posCliente);
}

const deleteClient = (index) => { //deletar o cliente 
  posCliente = getLocalStorage();
  posCliente.splice(index,1);
  setLocalStorage(posCliente);
}


const  createClient = (cliente) => { //criar cliente no localStorage
    
  const listClient = getLocalStorage();
     listClient.push(cliente);
     setLocalStorage(listClient);
     

}

// iteração com DOM


const valid = () =>{ //validação dos campos inputs
  return form.reportValidity();
}


const clearFields = () => { //limpar os campos inputs
    nome.value ="";
    email.value ="";
    tel.value ="";
    cidade.value ="";
}


const saveClient = () => { // salvar valor dos campos inputs
  
  if(valid()){
    
 const lsCliente = {
      Nome :  nome.value ,
      Email :  email.value ,
      Telefone: tel.value ,
      Cidade : cidade.value
  
  }
  const index = nome.dataset.index;
   if(index == 'new'){
     createClient(lsCliente);
     updateTable();
     closemodal();
    clearFields();
     }
     else{
       updateClient(index ,lsCliente);
       updateTable();
       closemodal();


     }
   }
  }

  const cancel = ()=>{ cancelar.value=closemodal()} //criando ação do botão cancelar


  const createRow = (cliente,index)=>{
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.tel}</td>
      <td>${cliente.cidade}</td>
      <td>
          <button type="button" class="button green" id="edit-${index}">Editar</button>
          <button type="button" class="button red" id="delete-${index}">Excluir</button>
      </td>
    `
    document.querySelector('#tbcliente>tbody').appendChild(newRow);

  }

  const updateTable = () =>{
    clearTable();
    const listClient = getLocalStorage();
    listClient.forEach(createRow);
  }

  const clearTable = () =>{
    const rows = document.querySelectorAll('#tbcliente>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row))
  }

  const fillFields = (cliente) => {
    nome.value = cliente.nome;
    email.value = cliente.email;
    tel.value = cliente.tel;
    cidade.value = cliente.cidade;
    nome.dataset.index=cliente.index;

  }

  const editCliente = (index) =>{
    const cliente = getLocalStorage()[index];
    cliente.index=index;
    fillFields(cliente)
    openmodal();

  }

  const editDelete = (event) => {
    
    if(event.target.type == 'button'){
      const [action,index] = event.target.id.split('-');

      if(action == 'edit'){
        editCliente(index);
      }else{
        const confirmCliente = getLocalStorage()[index];
        const response = confirm(`Deseja realmente excluir >>> ${confirmCliente.nome} <<<`);
        if(response){
          deleteClient(index);
          updateTable();

        }
      }
      
    }
  
 
  }
//mostar tabela no DOM
  updateTable();


//eventos

document.getElementById('cadastrarCliente').addEventListener('click', openmodal);
document.getElementById('modalClose').addEventListener('click',closemodal);
document.getElementById('salvar').addEventListener('click',saveClient);
document.querySelector('#tbcliente>tbody').addEventListener('click',editDelete);
document.getElementById('cancelar').addEventListener('click', cancel);



