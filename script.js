const input__form = document.getElementById('input__form');
const input__keys = document.getElementById('input__keys');
const input__description = document.getElementById('input__description');
console.log('my console log: input__form', input__form);

input__form.addEventListener('submit', e =>{
    e.preventDefault();
    console.log(input__keys.value);
    console.log(input__description.value);
})
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
const shortCut1 = new Shortcut('Ctrl+`','Show integrated terminal');
console.log(shortCut1.getKeys());
console.log(shortCut1.getDescription());
localStorage.setItem(shortCut1.getKeys(),JSON.stringify(shortCut1));
