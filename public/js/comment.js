
function getComments () {
    const docuId = document.getElementById("docuId").value
    axios.get('/comments',{ params:{document:docuId} })
    .then(res =>{
        const results = res.data
        const container = document.getElementById("commentCont")
        results.comments.forEach(e => {
            container.innerHTML += 
            `<div class="mb-3 border-bottom pb-3">
            <p class="card-subtitle mb-2 text-muted">${e.createdAt}</p>
            <i>${e.author.fullname}</i>
            <p> ${e.body} </p>
          </div>`
            
            
           
        });
    })
    .catch()   
}