const token = localStorage.getItem('token')
const tokenParts = token.split('.');
const payload = JSON.parse(atob(tokenParts[1]));

    // axios.get("http://localhost:3000/conta/" + payload.userId, {
    //     headers: {
    //         Authorization: "Bearer " + token
    //     }
    // })
    // .then(response => {
    //     document.getElementById('nickname').innerHTML = response.data.nickname 
    //     document.getElementById('username').innerHTML = response.data.username 
    //     console.log(response.data.email)

    // })
    // .catch(function (err) {
    //     alert(err.message)
    // })

// document.addEventListener('DOMContentLoaded', function() {
//     const token = localStorage.getItem('token');
//     const tokenParts = token.split('.');
//     const payload = JSON.parse(atob(tokenParts[1]));
//     const userId = payload.userId;
//     const userEmail = payload.email;
//     const userName = payload.username;
//     const userNick = payload.nickname;
  
//     document.getElementById('asd').innerHTML = userName;
//   });
  

axios.get('http://localhost:3000/postagem')
            .then(function (response){
             document.getElementById('exibir').innerHTML = response.data.map(function (postagem){
                return (
                    `<div class="container container-feed">
                    <div class="row row-feed">
                      <div class="col-1">
                        <img src="../Imagens/icone-perfil-default.png" width="70px" height="70px">
                      </div>
                      <div class="col-3" style="margin-left: 5%;">
                        <h3>${postagem.nickname}</h3>
                        <h6 style="color: darkgray;">@${postagem.username}</h6>
                      </div>
                    </div>
                    <div class="row row-text">
                      <div class="col-12">
                        <label class="escritas">${postagem.texto}</label>
                      </div>
                    </div>
                    <div class="row row-items">
                      <div class="col-1 col-items" id="first-item">
                        <img src="../Imagens/botao-de-comentar.png" height="35px" id="items">
                      </div>
                      <div class="col-1 col-items">
                        <img src="../Imagens/botao-de-like.png" height="35px" id="items">
                      </div>
                    </div>
                  </div>`
                );
             }).join('');   
            })
            .catch(function (err){
                console.log(err)
            });