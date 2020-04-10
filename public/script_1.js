const output = document.getElementById('output__container');
const add__button = document.getElementById('add__button');
const description__textarea = document.getElementById('description__textarea');
const input__textarea = document.getElementById('input__textarea');
const send__button = document.getElementById('send__button');
const cancel__button = document.getElementById('cancel__button');
// open input for snippet
add__button.addEventListener('click', e=>{
    toggleInput();
    
})
// loading code snippets from firestore
db.collection("jsSnippets").get()
.then(snapshot=>{
    const docs = snapshot.docs;
    docs.forEach(e=>{
        const snippet = e.data().code;
        const description = e.data().description;
        output.innerHTML += `<h4 class="snippet__header">${description}</h4>`
        const prism_el = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-js';
        code.innerText = snippet;
        prism_el.append(code);
        output.append(prism_el);
    })
    Prism.highlightAll();
})
// getting the input & sending it to the firestore

send__button.addEventListener('click', e=>{
    const snippet = input__textarea.value;
    const description = description__textarea.value;
    console.log(snippet);
    toggleInput();

    // sending to firestore
    db.collection("jsSnippets").add({
        code: snippet,
        description: description
    })
    .catch(err=>console.error(err))
    
})
// canceling input 
cancel__button.addEventListener('click', e=>{
    toggleInput();
    
})
// toggling whole visibility input function
function toggleInput() {
    input__textarea.classList.toggle('input__textarea--hide');
    description__textarea.classList.toggle('input__textarea--hide');
    send__button.classList.toggle('send__button--hide');
    cancel__button.classList.toggle('cancel__button--hide');
    input__textarea.value = '';
    description__textarea.value = '';


}