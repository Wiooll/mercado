// Adiciona um item ao carrinho
function adicionarItem() {
    var item = document.getElementById("itens").value;
    if(item === "") {
        alert("Erro: Nenhum item foi digitado!");
        return;
    }
    var carrinho = document.getElementById("carrinho");
    var novoItem = document.createElement("p");
    novoItem.textContent = item;
    carrinho.appendChild(novoItem);
    console.log("Item adicionado ao carrinho:", item);
}

//Lógica botão limpar carrinho
function limparCarrinho() {
    var carrinho = document.getElementById("carrinho");
    carrinho.innerHTML = "";
}

//Lógica botão salvar carrinho
function salvarCarrinho() {
    var carrinho = document.getElementById("carrinho").innerHTML;
    localStorage.setItem("carrinho", carrinho);
}

//Lógica botão carregar carrinho
function carregarCarrinho() {
    var carrinho = localStorage.getItem("carrinho");
    document.getElementById("carrinho").innerHTML = carrinho;
}

//Lógica botão limpar lista
function limparLista() {
    localStorage.removeItem("carrinho");
    document.getElementById("carrinho").innerHTML = "";
}