window.onload = function() {
    const savedTerms = JSON.parse(localStorage.getItem('terms')) || [];

    const termInput = document.querySelector("#termInput");
    const definitionInput = document.querySelector("#definitionInput");
    const searchInput = document.querySelector("#searchInput");

    const addBtn = document.querySelector("#addBtn");
    const searchBtn = document.querySelector("#searchBtn");
    const viewAllBtn = document.querySelector("#viewAllBtn");
    const addTermBtn = document.querySelector("#addTermBtn");
    const searchTermBtn = document.querySelector("#searchTermBtn");

    const inputArea = document.querySelector("#inputArea");
    const searchArea = document.querySelector("#searchArea");
    const listArea = document.querySelector("#listArea");

    addBtn.addEventListener("click", function() {
        inputArea.style.display = "block";
        searchArea.style.display = "none";
        listArea.style.display = "none";
    });

    searchBtn.addEventListener("click", function() {
        inputArea.style.display = "none";
        searchArea.style.display = "block";
        listArea.style.display = "none";
    });

    viewAllBtn.addEventListener("click", function() {
        inputArea.style.display = "none";
        searchArea.style.display = "none";
        listArea.style.display = "block";
        displayTerms(savedTerms);
    });

    addTermBtn.addEventListener("click", function() {
        if (termInput.value != "" && definitionInput.value != "") {
            const newTerm = { term: termInput.value, definition: definitionInput.value, check: false };
            savedTerms.push(newTerm);
            localStorage.setItem('terms', JSON.stringify(savedTerms));
            termInput.value = "";
            definitionInput.value = "";
            alert('용어가 등록되었습니다.');
        }
    });

    searchTermBtn.addEventListener("click", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTerms = savedTerms.filter(t => t.term.toLowerCase().includes(searchTerm));
        displayTerms(filteredTerms);
    });

    function displayTerms(terms) {
        listArea.innerHTML = "";
        terms.forEach(term => addTermToList(term));
        listArea.style.display = "block";
    }

    function addTermToList(term) {
        const liNode = document.createElement("li");
        const checkBtn = document.createElement("button");
        const termText = document.createElement("span");
        const definitionText = document.createElement("span");
        const delBtn = document.createElement("button");

        checkBtn.classList.add("checkBtn");
        checkBtn.innerHTML = term.check ? "✔" : "";

        termText.classList.add("termText");
        termText.innerText = term.term;

        definitionText.classList.add("definitionText");
        definitionText.innerText = term.definition;

        delBtn.classList.add("delBtn");
        delBtn.innerText = "X";

        liNode.appendChild(checkBtn);
        liNode.appendChild(termText);
        liNode.appendChild(definitionText);
        liNode.appendChild(delBtn);
        listArea.appendChild(liNode);

        checkBtn.addEventListener("click", function() {
            term.check = !term.check;
            checkBtn.innerHTML = term.check ? "✔" : "";
            localStorage.setItem('terms', JSON.stringify(savedTerms));
        });

        delBtn.addEventListener("click", function() {
            const index = savedTerms.indexOf(term);
            savedTerms.splice(index, 1);
            localStorage.setItem('terms', JSON.stringify(savedTerms));
            liNode.remove();
        });
    }
}
