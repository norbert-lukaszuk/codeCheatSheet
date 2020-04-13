const output = document.getElementById('output__container');
const add__button = document.getElementById('add__button');
const description__textarea = document.getElementById('description__textarea');
const input__textarea = document.getElementById('input__textarea');
const send__button = document.getElementById('send__button');
const cancel__button = document.getElementById('cancel__button');
const category = document.getElementsByName('category');
const category__wraper = document.getElementById('category__wraper');
const navigation__list = document.getElementById('navigation__list');
const main__header = document.getElementById('main__header');
let category__selected = 'jsSnippets';

// open input for snippet

add__button.addEventListener('click', e=>{
    toggleInput();
    
})
// navigation listener

navigation__list.addEventListener('click', e=>{
    if(e.target.tagName === 'LI'){
        console.log(e.target.getAttribute('lang-id'));
        console.log(e.target.getAttribute('snip-id'));
        category__selected = e.target.getAttribute('snip-id');
        const lang = e.target.getAttribute('lang-id');
        output.innerHTML = '';
        main__header.innerText = category__selected;
        db.collection(`data/codeSnippets/${category__selected}/`).orderBy('description').onSnapshot(snapshot=>{
                snapshot.docChanges().forEach(e=>{
                    if(e.type === 'added'){
            
                        const snippet = e.doc.data().code;
                        const description = e.doc.data().description;
                        output.innerHTML += `<h4 class="snippet__header">${description}</h4>`
                        const prism_el = document.createElement('pre');
                        const code = document.createElement('code');
                        code.className = lang;
                        code.innerText = snippet;
                        prism_el.append(code);
                        output.append(prism_el);
                    }
                })
                Prism.highlightAll();
            })
    }
})

db.collection(`data/codeSnippets/${category__selected}/`).orderBy('description').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(e=>{
        if(e.type === 'added'){

            const snippet = e.doc.data().code;
            const description = e.doc.data().description;
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

// send procedure 
send__button.addEventListener('click', e=>{
    const snippet = input__textarea.value;
    const description = description__textarea.value;
    const category = checkCategory();
    console.log(category);
    if(category === undefined){
        alert('Select language of snippet')
    }
    else{
    toggleInput();

    // sending to firestore
    db.collection(`data/codeSnippets/${category}/`).add({
    // db.collection('data').doc('codeSnippets').collection(category).add({
        code: snippet,
        description: description
    })
    .catch(err=>console.error(err))
    }
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
    category__wraper.classList.toggle('category__wraper--hide');
    navigation__list.classList.toggle('navigation__list--hidden'); // hide main menu
    input__textarea.value = '';
    description__textarea.value = '';
    // reset radio buttons in input
    category.forEach(e=>e.checked = false);
}
// check witch category radio input is selected
function checkCategory(){
    let value; 
    category.forEach(e=>{
        if(e.checked){
            value = e.value
        }
    })
    return value
}