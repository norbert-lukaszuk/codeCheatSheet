const output = document.getElementById('output__container');
db.collection("jsSnippets").get()
.then(snapshot=>{
    console.log(snapshot.docs[0].data().code);
    snippet = (snapshot.docs[0].data().code);
    const prism_el = document.createElement('pre');
    const code = document.createElement('code');
    code.className = 'language-js';
    code.id = 'snippet';
    console.log(code);
    code.innerText = snippet;
    code.innerHTML.replace(/<br \/>/g,'\n')
    console.log(prism_el);
    prism_el.append(code);
    output.append(prism_el);
    Prism.highlightAll();

})
