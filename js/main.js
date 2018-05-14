const ul = document.getElementById("repos");
const url = "https://api.github.com/users/adrian609/repos";
const selector = document.getElementById("inlineFormCustomSelect");
var repoArray=[];

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url).then(response => response.json()).then(function (data) {
    //console.log(data);
    let repos = data; // Get the results
    return repos.map(function (repo) { // Map through the results and for each run the code below

        let  repoTitle = repo.name,
            repoURL = repo.html_url,
            repoLang = repo.language;

        let repoObject = {
            name: repoTitle,
            language: repoLang,
            url: repoURL
        };

        createList(repoObject);


    });
}).catch(function (error) {
    console.log(error);
});

function createList(repoObject) {

    //console.log(repoObject);
    var temp = repoArray.push(repoObject);
    

    let li = createNode('li'),
        button = createNode('button');

    button.innerHTML = "View On GitHub";
    li.innerHTML = `Title: ${repoObject.name}  <br> Language:  ${repoObject.language}`;
    li.classList.add('list-group-item');
    li.classList.add('text-left');
    button.classList.add('btn');
    button.classList.add("btn-outline-primary");
    button.classList.add("float-right")
    append(li, button);
    append(ul, li);
    //append(selector, op);
    repoArray[0].name;
    return repoArray;
}



