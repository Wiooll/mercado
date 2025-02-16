//Lógica para adicionar os produtos no carrinho
function adicionarProduto() {
    var produto = document.getElementById("produto").value;
    var carrinho = document.getElementById("carrinho");
    var novoProduto = document.createElement("div");
    novoProduto.classList.add("box");
    novoProduto.textContent = produto;
    carrinho.appendChild(novoProduto);
    document.getElementById("produto").value = "";
}

//Lógica botão limpar carrinho
function limparCarrinho() {
    var carrinho = document.getElementById("carrinho");
    carrinho.innerHTML = "";
}