let fotoPerfilPostagem = "";

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));

    axios.get("http://localhost:3000/conta/" + payload.userId, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(response => {
        const ownerUser = response.data.username;

        axios.get('http://localhost:4000/postagem')
            .then(function (response) {

                const filteredPostagens = response.data.filter(function (postagem) {
                    return postagem.username == ownerUser;
                });

                document.getElementById('exibir').innerHTML = filteredPostagens.map(function (postagem) {
                    return (
                      `<div class="container container-feed">
                      <div class="row row-feed">
                        <div class="col-1">
                          <img src="${fotoPerfilPostagem}" width="70px" height="70px" style="border-radius: 50%;">
                        </div>
                        <div class="col-5" style="margin-left: 5%;">
                          <h3>${postagem.nickname}</h3>
                          <h6 style="color: darkgray;">@${postagem.username}</h6>
                          <p style="color: darkgray;">Postado às ${postagem.dateTime}</p>
                        </div>
                      </div>
                      <div class="row row-text">
                        <div class="col-12">
                          <label class="escritas">${postagem.texto}</label>
                        </div>
                      </div>
                      <div class="row row-items">
                        <div class="col-2 col-items">
                          <img src="../Imagens/botao-de-like.png" type="button" onclick="curtir()" height="35px" id="items">
                          <label class="likeNum">${postagem.like}</label>
                        </div>
                      </div>
                    </div>`
                    );
                }).join('');
            })
            .catch(function (err) {
                console.log(err);
            });

        const bio = response.data.bio;
        document.getElementById('nickname').innerHTML = response.data.nickname;
        if (bio == '') {
            document.getElementById('bio').innerHTML = "< Conta sem bio >" + response.data.bio;
        } else {
            document.getElementById('bio').innerHTML = response.data.bio;
        }
        document.getElementById('username').innerHTML = '@' + response.data.username;
        console.log(response.data.email);
    })
    .catch(function (err) {
        alert(err.message);
    });

    function exibirFotoPerfil() {
        console.log(payload.userId)
        axios.get('http://localhost:5000/pictures?id_usuario=' + payload.userId)
          .then(function (response) {
            console.log(response.data[0].src)
            var pictureData = response.data[0].src;
            console.log(pictureData)
            var fotoPerfilElement = document.getElementById('foto-perfil');
            fotoPerfilElement.src = "../../back_end/apiImagens/" + pictureData;
            fotoPerfilElement.style.borderRadius = "50%";
            fotoPerfilPostagem = "../../back_end/apiImagens/" + pictureData;
          })
          .catch(function (error) {
            console.error('Erro ao obter a foto de perfil:', error);
          });
      }
    
      exibirFotoPerfil();
});