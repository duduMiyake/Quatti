const token = localStorage.getItem('token')
const tokenParts = token.split('.');
const payload = JSON.parse(atob(tokenParts[1]));

const id_usuario = payload.userId

function publicar() {
    const texto = document.getElementById('textArea')
    const input = texto.value

    if (input == '') {
        alert("preencha todos os campos")
        return
    }

    const date = new Date()

    axios.get("http://localhost:3000/conta/" + payload.userId, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
        
            const dateLocal = date.toLocaleDateString()
            const timeLocal = date.toLocaleTimeString()
            const username = response.data.username
            const nickname = response.data.nickname
            const dateTime = timeLocal + ' - ' + dateLocal
            const like = 0
            axios.post("http://localhost:4000/postagem", {

                texto: input,
                id_usuario: id_usuario,
                username: username,
                nickname: nickname,
                dateTime: timeLocal + ' - ' + dateLocal,
                like: like

            }).then((response) => {

                alert("postado com sucesso ")
                window.location.href = "../home_screen/home_screen.html"

            }).catch(function (err) {
                alert(err.message);
            });

        })

        .catch(function (err) {
            alert(err.message)
        })

}
