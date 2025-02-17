//Lógica para adicionar itens a lista
function adicionarItem() {
    var item = document.getElementById("itens").value;
    var lista = document.getElementById("lista");
    var novoItem = document.createElement("li");            
    novoItem.textContent = item;
    lista.appendChild(novoItem);
    document.getElementById("itens").value = "";
    novoItem.addEventListener("click", function() {
        lista.removeChild(novoItem);
    }); 
}   

//Lógica para limpar a lista
function limparLista() {
    var lista = document.getElementById("lista");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

//Lógica para fechar o menu de navegação
function fecharMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = "none";
}

//Lógica para abrir o menu de navegação
function abrirMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = "block";
}