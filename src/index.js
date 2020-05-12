import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import {initObject} from './assets/fb_init_obj';
import Prism from 'prismjs';
import './style.scss';
// import '../public/prism.css';
Prism.highlightAll();

const app = firebase.initializeApp(initObject);
const db = firebase.firestore();
const auth = firebase.auth();
const output = document.getElementById("output__container");
const add__button = document.getElementById("add__button");
const description__textarea = document.getElementById("description__textarea");
const input__textarea = document.getElementById("input__textarea");
const send__button = document.getElementById("send__button");
const cancel__button = document.getElementById("cancel__button");
const category = document.getElementsByName("category");
const category__wraper = document.getElementById("category__wraper");
const navigation__list = document.getElementById("navigation__list");
const main__header = document.getElementById("main__header");
const power__button = document.getElementById('power__button');
const login__form = document.getElementById('login__form');
const login__submit = document.getElementById('login__submit');
const logout__button = document.getElementById('logout__button');
let category__selected = "jsSnippets";

// listener for login status 
auth.onAuthStateChanged(user => {
  if(user){   
    output.innerHTML = '';
    power__button.classList.replace('logout','login');
      login__form.user__email.style.display = 'none';
      login__form.user__password.style.display = 'none';
      login__form.login__submit.style.display = 'none';
              login__form.logout__button.style.display = 'block';
              getCollection();
              console.log(user);
    }
    else{
      power__button.classList.replace('login','logout');
      login__form.user__email.style.display = 'block';
      login__form.user__password.style.display = 'block';
      login__form.login__submit.style.display = 'block';
      login__form.logout__button.style.display = 'none';
      output.innerHTML = `<h3 style="text-align: center">You have to log in...</h3>`
      console.log(user);
    }
  })

  // open input for snippet

add__button.addEventListener('click', e=>{
  toggleInput();
  
});

// power__button listener

power__button.addEventListener('click', e=>{
  login__form.classList.toggle('login__form--hide');
});

// login button
login__form.addEventListener('submit', e=>{
  e.preventDefault();
  const email = login__form.user__email.value;
  const password = login__form.user__password.value;
      auth.signInWithEmailAndPassword(email, password);
      login__form.classList.add('login__form--hide');
      login__form.reset();
});

// logout button

logout__button.addEventListener('click', e=>{
auth.signOut();
});
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
      console.log(e.type);
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
// check if the user is login
// function isLogin(){
//     if(auth.getUid()){
//         console.log('user in');
//         power__button.classList.add('login');
//     }
//     else if(!auth.getUid()){
//         console.log('user out');
//         // power__button.classList.remove('login');
//     }
// }
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

// get collection from firestore

function getCollection() {
  db.collection(`data/codeSnippets/${category__selected}/`).orderBy('description').get()
  .then(snapshot=>{
      snapshot.docs.forEach(e=>{
          console.log(e.data());
          const snippet = e.data().code;
          const description = e.data().description;
          output.innerHTML += `<h4 class="snippet__header">${description}</h4>`
          const prism_el = document.createElement('pre');
          const code = document.createElement('code');
          code.className = 'language-js';
          code.innerText = snippet;
          prism_el.append(code);
          output.append(prism_el);
          Prism.highlightAll();
      })
  })
}
export {app, auth, db}