function getCategories(event) {
  const select = event.target

  axios.get(`/findCategories`)
    .then(response => {
      console.log(response.data)
    })
    .catch(console.error)
}