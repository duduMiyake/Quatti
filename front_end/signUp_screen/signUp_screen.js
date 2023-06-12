        const email = document.getElementById("InputEmail");
        const usename = document.getElementById("InputUser");
        const nickname = document.getElementById("InputNick");
        const password = document.getElementById("InputPassword");
        const confirm = document.getElementById("InputConfirm")

        function quatti() {
            // console.log("entrou");
            const form = document.getElementById("form")
            const inputEmail = email.value;
            const inputUser = usename.value;
            const inputNick = nickname.value;
            const inputPassword = password.value;
            const inputConfirm = confirm.value

            if (inputEmail == '' || inputUser == '' || inputNick == '' || inputPassword == '' || inputConfirm == '') {
                alert("Preencha todos os campos!")
                return
            }

            if (inputConfirm != inputPassword) {
                alert("Erro! As senhas não coincidem.");
                return
            }

            axios.get("http://localhost:3000/conta/email/" + inputEmail)
                .then(response => {

                    if (response.data.length > 0) {
                        alert("Este email já está em uso.");
                        form.reset();
                        return;
                    }

                    axios.post("http://localhost:3000/conta", {
                        email: inputEmail,
                        username: inputUser,
                        nickname: inputNick,
                        password: inputPassword

                    }).then((response) => {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        alert("Seja bem vindo! token: " + token)
                        window.location.href = "../home_screen/home_screen.html"

                    }).catch(function (err) {
                        alert(err.message);
                        form.reset();
                    });

                })
                .catch(function (err) {
                    alert(err.message)
                    form.reset()
                })
        }