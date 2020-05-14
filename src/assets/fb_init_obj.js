import {category__selected, output} from '../index';
export const initObject={
  apiKey: "AIzaSyDzvO7xqa9bwmCF5fRwX3fcRMME7pjyOmk",
  authDomain: "codecheatsheet-7d13a.firebaseapp.com",
  databaseURL: "https://codecheatsheet-7d13a.firebaseio.com",
  projectId: "codecheatsheet-7d13a",
  storageBucket: "codecheatsheet-7d13a.appspot.com",
  messagingSenderId: "147725314310",
  appId: "1:147725314310:web:fe8f5a82f5a9c04c685687"
};

export function dbDocChanges(category__selected){
  console.log(category__selected);
  db.collection(`data/codeSnippets/${category__selected}/`).orderBy('description').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(e=>{
        console.log(e.type);
        if(e.type === 'added'){
            const snippet = e.doc.data().code;
            const description = e.doc.data().description;
            output.innerHTML += `<h4 class="snippet__header">${description}</h4>`
            const prism_el = document.createElement('pre');
            prism_el.classList.add('line-numbers');
            const code = document.createElement('code');
            code.className = 'language-js';
            code.innerText = snippet;
            prism_el.append(code);
            output.append(prism_el);
        }
    })
    Prism.highlightAll();
  })
}