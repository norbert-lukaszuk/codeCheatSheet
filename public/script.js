const input__form = document.getElementById('input__form');
const input__keys = document.getElementById('input__keys');
const input__description = document.getElementById('input__description');
const user__list = document.getElementById('user__list');


    class Shortcut{
        constructor(keys, description){
            this.keys = keys;
            this.description = description;
        }
        getKeys(){
            return this.keys
        }
        getDescription(){
            return this.description
        }
    }
    
    
    
    input__form.addEventListener('submit', e =>{
        e.preventDefault();
        const keys = input__keys.value;
        const description = input__description.value;
        console.log(keys, description);
        const newShortcut = new Shortcut(keys, description);
        console.log('my console log: newShortcut', newShortcut)
        localStorage.setItem(newShortcut.getKeys(),JSON.stringify(newShortcut));
        input__form.reset();
        const shortCut__item = document.createElement('li');
        shortCut__item.className = 'shortCut__item';
        shortCut__item.innerHTML = `<b>${keys}</b> - ${description}`;
        user__list.prepend(shortCut__item);
        // firebase add
        db.collection("shortcuts").add({
            keys: keys,
            description: description
            })
        .then(err=>console.log(err))
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

// firebase get whole collection

db.collection("shortcuts").get()
.then(snapshot=>snapshot.docs.forEach(doc=>{
    const key = doc.data().keys;
    const description = doc.data().description;
    console.log(key, description);
    const shortCut__item = document.createElement('li');
   shortCut__item.className = 'shortCut__item';
   shortCut__item.innerHTML = `<b>${key}</b> - ${description}`;
    user__list.prepend(shortCut__item);
}))
.catch(err=>console.log(err))
