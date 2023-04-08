const btnFeed = document.getElementById('btn-feed')
const btnLikes = document.getElementById('btn-likes')

btnFeed.addEventListener('click', () => {
    btnFeed.style.backgroundColor = '#46464649'
    btnFeed.style.transition = '.5s ease'
    btnLikes.style.backgroundColor = 'transparent'
    btnLikes.style.transition = '.5s ease'
});

btnLikes.addEventListener('click', () => {
    btnLikes.style.backgroundColor = '#46464649'
    btnLikes.style.transition = '.5s ease'
    btnFeed.style.backgroundColor = 'transparent'
    btnFeed.style.transition = '.5s ease'
});