const output = document.getElementById('output__container');
db.collection("jsSnippets").get()
.then(snapshot=>{
    console.log(snapshot.docs[0].data().code);
    snippet = (snapshot.docs[0].data().code.toString());
    const prism_el = document.createElement('pre');
    const code = document.createElement('code');
    code.className = 'language-js';
    console.log(code.childNodes);
    prism_el.append(code);
    code.innerText = snippet;
    console.log(prism_el.childNodes);
    output.append(prism_el);
})