const text = document.getElementById('content');
const div = document.getElementById('doc-result');
const stackedit = new Stackedit();

// Listen to StackEdit events and apply the changes to the textarea.
stackedit.on('fileChange', (file) => {
    div.innerHTML = file.content.html;
    text.value = file.content.text
});


text.addEventListener("input", () =>{
  // Open the iframe
  stackedit.openFile({
    content: {
      text: text.value // and the Markdown content.
    }
  }); 
});

