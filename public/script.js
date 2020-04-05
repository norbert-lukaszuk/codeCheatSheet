const input__description = document.getElementById('input__description');
const input__keys = document.getElementById('input__keys');
const input__wraper = document.getElementById('input__wraper');
const login__button = document.getElementById('login__button');
const login__form = document.getElementById('login__form');
const input__form = document.getElementById('input__form');
const user__list = document.getElementById('user__list');
const user__email = document.getElementById('user__email');
const user__password = document.getElementById('user__password');
const user__logout = document.getElementById('logout__button');
console.log("user__logout", user__logout)

    class Shortcut{
        constructor(keys, description, created){
            this.keys = keys;
            this.description = description;
            this.created = created;
        }
        getKeys(){
            return this.keys
        }
        getDescription(){
            return this.description
        }
        getCreationDate(){
            return this.created.toLocaleDateString()
        }
    }

    login__button.addEventListener('click',e=>{
        e.preventDefault();
        const email = user__email.value;
        const password = user__password.value;
        console.log(email, password);
        login__form.reset();
        auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
            // close the signup modal & reset form
            console.log(cred);
            login__form.className = 'login__form--hide'
        })
        .catch(err =>{console.log(err)
            if(err.code === 'auth/wrong-password'||'auth/user-not-found'){
                alert('You typed wrong email or password');
            }
            else if(err.code === 'auth/network-request-failed'){
                alert('You have no internert connection');
            }
        })
        

    })
    
    input__form.addEventListener('submit', e =>{
        e.preventDefault();
        const keys = input__keys.value;
        const description = input__description.value;
        const created = new Date();
        console.log(keys, description);
        const newShortcut = new Shortcut(keys, description);
        console.log('my console log: newShortcut', newShortcut)
        localStorage.setItem(newShortcut.getKeys(),JSON.stringify(newShortcut));
        const shortCut__item = document.createElement('li');
        shortCut__item.className = 'shortCut__item';
        shortCut__item.innerHTML = `<b>${keys}</b> - ${description}`;
        user__list.prepend(shortCut__item);
        // firebase add the shortcut
        db.collection("shortcuts").add({
            keys: keys,
            description: description,
            created: firebase.firestore.Timestamp.fromDate(created)
        })
        .then(doc => shortCut__item.setAttribute('data-id',doc.id)) // get the id of curretly created shortcut
        .catch(err=>console.log(err))
        
        input__form.reset();
    })
    
    // cycle trough localStorage to get users shortcuts
    
    /* for(let i=0; i<localStorage.length; i++){
        const userShortcut = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const key = userShortcut.keys;
        const description = userShortcut.description;
        const shortCut__item = document.createElement('li');
        shortCut__item.className = 'shortCut__item';
        shortCut__item.innerHTML = `<b>${key}</b> - ${description}`;
        user__list.prepend(shortCut__item);
    } */
    user__logout.addEventListener('click', e=>{
            auth.signOut();
            login__form.reset();
            input__form.reset();
    })
    // 
    auth.onAuthStateChanged(user =>{
        if(user){console.log(user__email)
        
        // firebase get whole collection
        
        db.collection("shortcuts").get()
        .then(snapshot=>snapshot.docs.forEach(doc=>{
            const key = doc.data().keys;
            const description = doc.data().description;
            const shortCut__item = document.createElement('li');
            shortCut__item.className = 'shortCut__item';
            shortCut__item.setAttribute('data-id',doc.id); // unique id from firebase
            shortCut__item.innerHTML = `<b>${key}</b> - ${description}`;
            user__list.prepend(shortCut__item);
            login__form.className = 'login__form--hide'
            // login__form.style.visibility = 'hidden';
            // input__form.style.visibility = 'visible';
            input__form.className = 'input__form';
            
        }))
        .catch(err=>console.log(err))
    }
    else if(!user){//console.log(user)
    user__list.innerHTML = '';
    login__form.className = 'login__form'
    // login__form.style.visibility = 'visible';
    // input__form.style.visibility = 'hidden';
    input__form.className = 'input__form--hide'
}
})
user__list.addEventListener('click', e=>{
    if(e.target.tagName === 'LI'){
        console.log(e.target.getAttribute('data-id'));
    }
})
