const usuario = "teste@email.com"
const senha = 123456
const btnAcesso = document.getElementsById('btn-acesso')
const erroMessage = document.getElementById('erro-message')

btnAcesso.addEventListener('click', () => {
    let emailInput = document.getElementById('InputEmail').value
    let senhaInput = document.getElementById('InputPassword').value

    if(emailInput==usuario.value && senhaInput==senha.value) {
        window.location.href = "https://www.twitch.tv/baiano"
    } else {
        erroMessage.style.visibility = 'visible'
    }
});
