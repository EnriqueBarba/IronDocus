
function getComments () {
    const docuId = document.getElementById("docuId").value
    axios.get('/comments',{ params:{document:docuId} })
    .then(res =>{
        const results = res.data
        const container = document.getElementById("commentCont")
        results.comments.forEach(e => {
            container.innerHTML += 
            `<div class="mb-3 border-bottom pb-3">
            <p class="card-subtitle mb-2 text-muted">${formatDate(e.createdAt)}</p>
            <i>${e.author.fullname}</i>
            <p> ${e.body} </p>
          </div>`
        });
    })
    .catch(console.error)   
}

function formatDate(date) {
    const format = (s) => (s < 10) ? '0' + s : s
    var d = new Date(date)
    return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join('/') +` - `+ [format(d.getHours()), format(d.getMinutes()), format(d.getSeconds())].join(':')
}