document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token')
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));

    axios.get("http://localhost:3000/conta/" + payload.userId, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            document.getElementById('nickname').innerHTML = response.data.nickname
            document.getElementById('username').innerHTML = '@' + response.data.username
            console.log(response.data.email)

        })
        .catch(function (err) {
            alert(err.message)
        })
})