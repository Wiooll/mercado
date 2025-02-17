//Lógica para logar no site
function logar() {
    var usuário = document.getElementById("usuário").value;
    var senha = document.getElementById("senha").value;
    if (usuário === "admin" && senha === "admin") {
        window.location.href = "index.html"; //Redireciona para a página principal
    } else {
        alert("Usuário ou senha incorretos."); //Exibe uma mensagem de erro
    }
}   

//Verifica se o usuário está logado
function verificarLogin() {
    var usuário = localStorage.getItem("usuário");
    if (usuário) {
        window.location.href = "index.html"; //Redireciona para a página principal
    }
}

//verifica se o usuário existe no arquivo db
function verificarUsuario() {
    var usuário = document.getElementById("usuário").value;
    var senha = document.getElementById("senha").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "usuarios.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var usuarios = JSON.parse(xhr.responseText);
            var encontrado = false;
            for (var i = 0; i < usuarios.length; i++) {
                if (usuarios[i].login === usuário && usuarios[i].senha === senha) {
                    encontrado = true;
                    break;
                }
            }
            if (encontrado) {
                localStorage.setItem("usuário", usuário);
                window.location.href = "index.html"; //Redireciona para a página principal
            } else {
                alert("Usuário ou senha incorretos."); //Exibe uma mensagem de erro
            }                                   
    }
}   
xhr.send();
}       