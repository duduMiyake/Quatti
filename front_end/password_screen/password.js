const token = localStorage.getItem('token')
const tokenParts = token.split('.');
const payload = JSON.parse(atob(tokenParts[1]));


console.log(payload.userId)

function trocarSenha() {
    const senha = document.getElementById("InputPassword");
    const senhaConfirm = document.getElementById("InputPasswordConfirm");
    console.log("entrou")
    const inputSenha = senha.value;
    const inputSenhaConfirm = senhaConfirm.value

    if(inputSenhaConfirm == inputSenha){
        axios.put("http://localhost:3000/conta/" + payload.userId , {
            password: inputSenha
    
        })
    
        .then(response=>{
            alert("Senha alterada com sucesso!")
        })

        .catch(function (err){
            console.log(err)
        });
    } else {
        alert("Erro ao alterar a senha!")
    }

    

}
