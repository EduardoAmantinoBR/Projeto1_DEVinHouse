'use strict';
/*
let dbcompra = [
    {'text':'pão','tick':'null'},
    {'text':'pão doce','tick':'null'},
    {'text':'pão de foma','tick':'checked'}
];*/

const getDB = () => JSON.parse(localStorage.getItem('todolist')) ?? [];
const setDB = (dbcompra) => localStorage.setItem('todolist' , JSON.stringify(dbcompra));


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
        dbcompra.forEach ( (item, indice) => criaItem (item.text, item.tick, indice));
    }



    screenRender();

const limpaDB = () => {
        const dbcompra = [];
        setDB(dbcompra);
        screenRender();
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

const removeItem = (indice) => {
    const dbcompra = getDB();
    dbcompra.splice (indice,1);
    setDB (dbcompra);
    screenRender ();
}

const updateItem = (indice) => {
    const dbcompra = getDB();
    dbcompra[indice].tick = dbcompra[indice].tick === '' ? 'checked' : '';
    setDB(dbcompra);
    screenRender ();
}
/*const dbcompra = getDB();
    dbcompra[indice].tick = dbcompra[indice].tick === '' ? 'checked' : '';
    setDB(dbcompra);
    screenRender ();
    if (dbcompra[indice].tick === 'checked') {
        const preco = window.prompt('Insira o valor do produto','')
    }
*/

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
