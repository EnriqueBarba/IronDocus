window.onload = function() {
  getDepartments()
}

function getCategories(id) {
  removeCats();
  axios.get(`/findCategories`, { params:{depId:id} })
    .then(response => {
      const data = response.data
      const list = document.getElementById('listCat')
      data.cats.forEach(e => {
        list.innerHTML = list.innerHTML + `<option value="${e._id}">${e.name}</option>`
      });
      const docCat = document.getElementById('docCatId').value
      if ( docCat !== 0) {
        list.querySelector(`option[value="${docCat}"]`).selected = true
      }
    })
    .catch(console.error)
}

function getDepartments() {
  axios.get(`/findDepartments`)
    .then(response => { 
      const data = response.data
      const list = document.getElementById('listDepart')
      data.departs.forEach(e => {
        list.innerHTML = list.innerHTML + `<option value="${e._id}">${e.name}</option>`
      });
      const docDep = document.getElementById('docDepId').value
      if ( docDep !== 0) {
        list.querySelector(`option[value="${docDep}"]`).selected = true
        getCategories(docDep)
      } else {
        getCategories(list.querySelector('option').value)
      }
    })
    .catch(console.error)
}

function removeCats() {
  const cateLst = document.getElementById('listCat')
  cateLst.innerHTML = ''
}