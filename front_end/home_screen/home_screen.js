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

axios.get('http://localhost:4000/postagem')
  .then(function (response) {
    var fotoPerfilPromises = response.data.map(function (postagem) {
      return axios.get("http://localhost:5000/pictures?id_usuario=" + postagem.id_usuario)
        .then(function (response) {
          var pictureData = response.data[0].src;
          console.log("fotita " + pictureData)
          return "../../back_end/apiImagens/" + pictureData;
        })
        .catch(function (error) {
          console.error('Erro ao obter a foto de perfil:', error);
          return "../Imagens/icone-perfil-default.png";
        });
    });

    Promise.all(fotoPerfilPromises)
      .then(function (fotoPerfis) {
        document.getElementById('exibir').innerHTML = response.data.map(function (postagem, index) {
          var fotoPerfil = fotoPerfis[index];
          return (
            `<div class="container container-feed">
                <div class="row row-feed">
                  <div class="col-1">
                    <img src="${fotoPerfil}" width="70px" height="70px" style="border-radius: 50%;">
                  </div>
                  <div class="col-4" style="margin-left: 5%;">
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
                  <img src="../Imagens/botao-de-like.png" height="35px" id="likebtn" type="button" onclick="curtir('${postagem._id}')"> 
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
  })
  .catch(function (err) {
    console.log(err);
  });

  function curtir(postagem) {
    console.log("entrou")
    axios.get(`http://localhost:4000/postagem/` +postagem)
      .then(function (response) {
        const like = response.data.like;
        const newLike = like + 1;
  
        axios.put(`http://localhost:4000/postagem/` +postagem , { like: newLike })
          .then((response) => {
            alert("Like realizado!");
          })
          .catch(function (err) {
            alert(err.message);
          });
      })
      .catch(function (err) {
        alert(err.message);
      });
  }
  