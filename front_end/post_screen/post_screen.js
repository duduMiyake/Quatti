const token = localStorage.getItem('token')
const tokenParts = token.split('.');
const payload = JSON.parse(atob(tokenParts[1]));

const id_usuario = payload.userId
const username = payload.username
const nickname = payload.nickname

function publicar() {
    const texto = document.getElementById('textArea')
    const input = texto.value

    if(input == '') {
        alert("preencha todos os campos")
        return
    }

    axios.post("http://localhost:3000/postagem",  {
        
        texto: input,
        id_usuario: id_usuario,
        username: username, 
        nickname: nickname

    }).then((response) => {

        alert("postado com sucesso ")
        window.location.href = "../home_screen/home_screen.html"

    }).catch(function (err) {
        alert(err.message);
    });

}