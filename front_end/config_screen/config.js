const token = localStorage.getItem('token')
const tokenParts = token.split('.');
const payload = JSON.parse(atob(tokenParts[1]));

const usename = document.getElementById("InputUser");
const nickname = document.getElementById("InputNick");
const bio = document.getElementById("Inputbio");
const foto = document.getElementById('edit-profile')

let fotoPerfilPostagem = "";
let flag = false

function exibirFotoPerfil() {
  console.log(payload.userId)
  axios.get('http://localhost:5000/pictures?id_usuario=' + payload.userId)
    .then(function (response) {
      if (response.data && response.data.length > 0) {
        console.log(response.data[0].src)
        console.log("id do mano " + response.data[0]._id)

        var pictureData = response.data[0].src;

        console.log(pictureData)

        var fotoPerfilElement = document.getElementById('foto-perfil');
        fotoPerfilElement.src = "../../back_end/apiImagens/" + pictureData;
        fotoPerfilElement.style.borderRadius = "50%";
        fotoPerfilPostagem = "../../back_end/apiImagens/" + pictureData;
      } else {
        var fotoPerfilElement = document.getElementById('foto-perfil');
        fotoPerfilElement.src = "../../front_end/Imagens/icone-perfil-default.png"
      }
      
    })
    .catch(function (error) {
      console.error('Erro ao obter a foto de perfil:', error);
    });
}

exibirFotoPerfil()

function trocar() {
  const inputUser = usename.value;
  const inputNick = nickname.value;
  const inputBio = bio.value;
  const inputPhoto = foto.files[0];

  const formData = new FormData();

  formData.append('name', inputPhoto.name)
  formData.append('file', inputPhoto);
  formData.append('id_usuario', payload.userId)

  axios.put("http://localhost:3000/conta/" + payload.userId, {
    username: inputUser,
    nickname: inputNick,
    bio: inputBio
  })
    .then(response => {
      alert("alterado com sucesso")
    })
    .catch(function (err) {
      console.log(err)
    })

  axios.get('http://localhost:5000/pictures?id_usuario=' + payload.userId)
    .then(function (response) {

      console.log(response.data)
      if (response.data.length > 0) {

        console.log("tem uma foto ja!")
        id = response.data[0]._id

        console.log("id da pictures que eu estou vendo " + id)
        console.log("forms " + formData)

        axios.put("http://localhost:5000/pictures/" + id, formData)
          .then(response => {

            alert("imagem de perfil atualizada")

          }).catch(error => {

            console.error("Erro ao atualizar a imagem:", error);

          });
      } else {

        console.log("nao tem uma foto!")

        axios.post("http://localhost:5000/pictures", formData)
          .then(response => {

            alert("imagem salva no db")

          })
          .catch(error => {

            console.error("Erro ao salvar a imagem:", error);

          });
      }
    })
    .catch(function (error) {
      console.error('Erro ao obter a foto de perfil:', error);
    });

  // axios.post("http://localhost:5000/pictures", formData)
  //   .then(response => {
  //     alert("imagem salva no db")
  //   })
  //   .catch(error => {
  //     console.error("Erro ao salvar a imagem:", error);
  //   });
}