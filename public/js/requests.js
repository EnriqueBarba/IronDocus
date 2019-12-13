window.onload = function() {
  getDepartments()
}

function getCategories(id) {
  removeCats();
  axios.get(`/findCategories`, { params:{depId:id} })
    .then(response => {
      console.log(response.data)
      const data = response.data
      const list = document.getElementById('listCat')
      data.cats.forEach(e => {
        list.innerHTML = list.innerHTML + `<option value="${e._id}">${e.name}</option>`
      });
    })
    .catch(console.error)
}

function getDepartments() {
  axios.get(`/findDepartments`)
    .then(response => {
      console.log(response.data)
      const data = response.data
      const list = document.getElementById('listDepart')
      data.departs.forEach(e => {
        list.innerHTML = list.innerHTML + `<option value="${e._id}">${e.name}</option>`
      });
      getCategories(list.querySelector('option').value)
    })
    .catch(console.error)
}

function removeCats() {
  const cateLst = document.getElementById('listCat')
  cateLst.innerHTML = ''
}