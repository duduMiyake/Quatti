function verificarEmail() {
    const email = document.getElementById('InputEmail').value;
    const form = document.getElementById('form');

    axios.get("http://localhost:3000/conta/email/" + email)
        .then(response => {
            if (response.data.length > 0) {
                console.log(response.data[0]._id);
                localStorage.setItem('id_usuario', response.data[0]._id);
                alert("Validação confirmada");
                window.location.href = "../forgotPass/forgotPassword.html";
            } else {
                alert("Não existe uma conta registrada com esse email!");
                form.reset();
            }
        })
        .catch(function (err) {
            alert(err.message);
            form.reset();
        });
}

function trocarSenha() {
    const id_usuario = localStorage.getItem('id_usuario');
    const password = document.getElementById('InputPassword').value;
    const passwordC = document.getElementById('InputPasswordConfirm').value;

    console.log(id_usuario)

    if (password == passwordC) {
        axios.put("http://localhost:3000/conta/" + id_usuario, {
            password: password
        })
            .then(response => {
                alert("Senha trocada com sucesso");
                window.location.href = "../signIn_screen/signIn_screen.html";
            })
            .catch(error => {
                console.error("Erro: ", error);
            });
    } else {
        alert("As senhas não coincidem");
    }
}