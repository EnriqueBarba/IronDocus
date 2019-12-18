const text = document.getElementById('content');
const but = document.getElementById('writeDoc');
const div = document.getElementById('contentHtml');
const prevDiv = document.getElementById('previewDiv');
const stackedit = new Stackedit();

// Listen to StackEdit events and apply the changes to the textarea.
stackedit.on('fileChange', (file) => {
  prevDiv.innerHTML = file.content.html;
  text.value = file.content.text
  div.value = file.content.html
});


but.addEventListener("click", (event) =>{
  event.preventDefault()
  stackedit.openFile({
    content: {
      text: text.value // and the Markdown content.
    }
  }); 
});

