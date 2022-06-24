const btnCadastrar = document.querySelector('.btnCadastrar');
btnCadastrar.addEventListener('click', function (e) {
    e.preventDefault();
    capInfor();
    capturaDadosLocalStorage()
});

const btnFechar = document.querySelector('.btnFechar');
btnFechar.addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

function capInfor(){
    const infoData = document.getElementById('selectDate');
    const infoCategoria = document.getElementById('categoria');
    const infodescription = document.getElementById('description');
    const infoValor = document.getElementById('valor');    

    let idAlert = null;

    if(infoData.value === '' || infoCategoria.value === '' || infodescription.value === '' || infoValor.value === ''){
        idAlert = 1;
        alert(idAlert);
        return;
    } else {
        idAlert = 2;
        alert(idAlert);
        let dados = new Dados(
            infoData.value, 
            infoCategoria.value, 
            infodescription.value, 
            infoValor.value,            
        );
        bancoDados(dados);
        // zerando valores dos inputs caso cadastro do banco de dados tenha sido feito com sucesso
        infoData.value = ''
        infoCategoria.value = ''
        infodescription.value = ''
        infoValor.value = ''        
    }      
}

//Funcao que cria botao excluir
function btnApagar(linha, d){
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Excluir';
    linha.appendChild(btnApagar);
    //pegando id do key no localStorage
    btnApagar.id = d;

    btnApagar.addEventListener('click', (e) => {
        let elemento = e.target    
        elemento.parentElement.remove()
        //apaga do localStorage, pegando o id do botao    
        localStorage.removeItem(btnApagar.id)
    })
}

function bancoDados(dados){    
    let id = 1;
    if(localStorage.length > 0){
        id = id + localStorage.length;
    }    
    const convertJSON = JSON.stringify(dados);  
    localStorage.setItem(id, convertJSON);   
}

class Dados {
    constructor(data, categoria, descricao, valor){
        this.data = data
        this.categoria = categoria
        this.descricao = descricao
        this.valor = valor
    }
}

function alert(idAlert) {
    //Cadastrado com Sucesso!
    switch(idAlert){
        case 1:
           document.querySelector('.modal').style.display = 'flex';
           document.querySelector('.modal .mensageAlert .text .alertTitle').textContent = 'Informe os dados corretamente';   
           document.querySelector('.modal .mensageAlert .text .alertTitle').style.color = 'red';
           document.querySelector('.btnFechar').style.backgroundColor = 'rgb(184, 17, 17)';
        break;
        case 2:
            document.querySelector('.modal').style.display = 'flex';
            document.querySelector('.modal .mensageAlert .text .alertTitle').textContent = 'Cadastrado com sucesso!';   
            document.querySelector('.modal .mensageAlert .text .alertTitle').style.color = 'green';
            document.querySelector('.btnFechar').style.backgroundColor = 'green';
        break;
    }
}

function capturaDadosLocalStorage() {
        
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

    let linha;    
    let info;
    let listaInfo;
    let despesas = [];
    
    // Captura as keys presentes no localStorage
    const keys = Object.keys(localStorage);
    for(let key of keys){        
        info = localStorage.getItem(key);
        listaInfo = JSON.parse(info);
        //gerando id no lista de tarefas, sendo recuperados do localstorage
        listaInfo.id = key
        despesas.push(listaInfo);        
    }     
    
    despesas.forEach(function(d){
        linha = listaDespesas.insertRow();
        linha.insertCell(0).innerHTML = d.data
    
        switch(d.categoria){
            case '1':
                linha.insertCell(1).innerHTML = 'Alimentação';
            break
            case '2':
                linha.insertCell(1).innerHTML = 'Lazer';
            break
            case '3':
                linha.insertCell(1).innerHTML = 'Transporte';
            break
            case '4':
                linha.insertCell(1).innerHTML = 'Educação';
            break
        }

        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = `R$ ${Number(d.valor).toFixed(2)}`;
        //chama funcao que cria botao e passando id do key
        btnApagar(linha, d.id);
        
    });    
}

