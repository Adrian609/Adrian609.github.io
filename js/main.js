const ul = document.getElementById("repos");
const url = "https://api.github.com/users/adrian609/repos";

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url).then(response => response.json()).then(function (data) {
    console.log(data);
    let repos = data; // Get the results
    return repos.map(function (repo) { // Map through the results and for each run the code below

        let repoTitle = repo.name,
            repoURL = repo.html_url,
            repoLang = repo.language;

        let li = createNode('li'),
            a = createNode('a');
       
        li.innerHTML = `Title: ${repoTitle}  <br> Language:  ${repoLang}`; // Make the HTML of our span to be the first and last name of our author
        li.classList.add('list-group-item');
        li.classList.add('text-left');
        a.classList.add('btn');
        a.classList.add("btn-outline-primary");
        a.classList.add("float-right");
        a.href = `${repoURL}`;
        a.innerHTML = "View On GitHub";
        a.target = "_blank";
        append(li, a);
        append(ul, li);
    });
}).catch(function (error) {
    console.log(error);
});   
