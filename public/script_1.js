const output = document.getElementById('output__container');
const add__button = document.getElementById('add__button');
const input__textarea = document.getElementById('input__textarea');
add__button.addEventListener('click', e=>{
    input__textarea.classList.toggle('input__textarea--hide');
})
db.collection("jsSnippets").get()
.then(snapshot=>{
    const docs = snapshot.docs;
    docs.forEach(e=>{
        for(let i=0; i<=5; i++){

            const snippet = e.data().code;
            const description = e.data().description;
            output.innerHTML += `<h4 class="snippet__header">${description}</h4>`
            const prism_el = document.createElement('pre');
            const code = document.createElement('code');
            code.className = 'language-js';
            code.innerText = snippet;
            prism_el.append(code);
            output.append(prism_el);
        }

    })
    Prism.highlightAll();

})
