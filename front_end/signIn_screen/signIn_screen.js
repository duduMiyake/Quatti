const email = document.getElementById("InputEmail");
const password = document.getElementById("InputPassword");

function login() {

    console.log("entrou")

    const form = document.getElementById('form')
    const inputEmail = email.value;
    const inputPassword = password.value;

    if (inputEmail == '' || inputPassword == '') {
        alert("Preencha todos os campos!");
        return
    }

    axios.post("http://localhost:3000/login", { email: inputEmail, password: inputPassword })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            alert("Seja bem-vindo! Token: " + token);
            window.location.href = "../home_screen/home_screen.html";
        })
        .catch(function (err) {
            if (err.response && err.response.status == 404) {
                alert("Email não encontrado!");
            } else if (err.response && err.response.status == 401) {
                alert("Senha incorreta");
            } else if (err.response && err.response.status == 500) {
                alert("Erro ao fazer login");
            } else {
                console.log(err.message);
            }
            form.reset();
        });

}