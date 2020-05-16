import {category__selected,db,lang, output, unsubscribe} from '../index';
export const initObject={
  apiKey: "AIzaSyDzvO7xqa9bwmCF5fRwX3fcRMME7pjyOmk",
  authDomain: "codecheatsheet-7d13a.firebaseapp.com",
  databaseURL: "https://codecheatsheet-7d13a.firebaseio.com",
  projectId: "codecheatsheet-7d13a",
  storageBucket: "codecheatsheet-7d13a.appspot.com",
  messagingSenderId: "147725314310",
  appId: "1:147725314310:web:fe8f5a82f5a9c04c685687"
};

export function dbDocChanges(category__selected, lang){
  console.log(category__selected);
 unsubscribe = db.collection(`data/codeSnippets/${category__selected}/`).orderBy('description').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(e=>{
        if(e.type === 'added'){
            const snippet = e.doc.data().code;
            const description = e.doc.data().description;
            const codeBlock = document.createElement('div');
            codeBlock.className = 'codeBlock';
            codeBlock.id = 'codeBlock';
            codeBlock.innerHTML += `<h4 class="snippet__header">${description}</h4>`
            const prism_el = document.createElement('pre');
            if(window.innerWidth>360){ prism_el.classList.add('line-numbers') };
           
            const code = document.createElement('code');
            code.className = lang;
            code.innerText = snippet;
            prism_el.append(code);
            codeBlock.append(prism_el);
            output.append(codeBlock);
        }
    })
    Prism.highlightAll();
  })
}
