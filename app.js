'use strict';


const getDB = () => JSON.parse(localStorage.getItem('todolist')) ?? [];
const setDB = (dbcompra) => localStorage.setItem('todolist' , JSON.stringify(dbcompra));
var soma = 0



            const criaItem = (text, tick, indice) => {
                const item = document.createElement('label');
                item.classList.add ('todo__item');
                item.innerHTML = `
                <input type="checkbox" ${tick} data-indice=${indice}>
                <div>${text}</div>
                <input type="button" value="X" data-indice=${indice}>
                `
                document.getElementById('todoList').appendChild(item);
            }
    const screenClear = () => {
        const todoList = document.getElementById ('todoList');
        while (todoList.firstChild) {
            todoList.removeChild(todoList.lastChild);
    } 
}

    const screenRender = () => {
        screenClear()
        const dbcompra = getDB();
        //if (dbcompra.item !== undefined) {
        dbcompra.forEach ( (item, indice) => criaItem (item.text, item.tick, indice));
    }



    screenRender();

const limpaDB = () => {
        const limpa = window.confirm('Você realmente deseja apagar todos os itens?')
        if (limpa === true) {
        const dbcompra = [];
        setDB(dbcompra);

        screenRender();
        document.getElementById('valorsoma').innerText ='0'
        }
    }    

const adicionaItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter' ) {
        const dbcompra = getDB ();
        dbcompra.push ({'text':texto,'tick':''})
        setDB(dbcompra);
        screenRender();
        evento.target.value = '';
    }

}
const adicionaBut = () => {
        if (document.getElementById("newItem").value !=[]) {

        const texto = document.getElementById("newItem").value;
        const dbcompra = getDB ();
        dbcompra.push ({'text':texto,'tick':''})
        setDB(dbcompra);
        screenRender();
        document.getElementById("newItem").value = '';
    } else {
        window.alert ('Preencha o campo para inserir um novo item!')
    }
}


const removeItem = (indice) => {
    const dbcompra = getDB();
    dbcompra.splice (indice,1);
    setDB (dbcompra);
    screenRender ();
}

const removeComprados = () => {
    
    const dbcompra = getDB();
    let conf = window.confirm(`Você confirma a compra dos itens selecionados? Eles serão excluídos da lista!!!`)
    if (conf === true) {
        
        let iten1 = dbcompra
        let indexador = iten1.length
        dbcompra.forEach(element.tick===0,index => { 
            if (element.tick === 'checked')
            {removeItem}
            
        });
        };

    }



/*
const removeComprados = () => {
    
    const dbcompra = getDB();
    let conf = window.confirm(`Você confirma a compra dos itens selecionados? Eles serão excluídos da lista!!!`)
    if (conf === true) {
        
        let iten1 = dbcompra
        let indexador = iten1.length
        for (let i=0; i< indexador; i++) {
            let conteudo = iten1[i]
            if (conteudo.tick === 'checked') {
                removeItem(i)

            }

        }

        };

    }
*/
const updateItem = (indice) => {
    const dbcompra = getDB();
    
    dbcompra[indice].tick = dbcompra[indice].tick === '' ? 'checked' : '';
    setDB(dbcompra);
    
    if (dbcompra[indice].tick === 'checked') {
        
        let preco = (window.prompt(`Qual é o valor do produto?`))
        soma += parseFloat(preco)
        document.getElementById('valorsoma').innerText = soma
        screenRender ();
    } 
    
    
    }



const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removeItem(indice);
    } else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        updateItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress',adicionaItem);
document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('apagaTudo').addEventListener('click', limpaDB);
document.getElementById('Adiciona').addEventListener('click', adicionaBut);
document.getElementById('apagaComprados').addEventListener('click', removeComprados);


