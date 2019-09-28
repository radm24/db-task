//Fetching default data
fetch("defaultdata.php")
    .then(res => res.json())
    .then(data => defaultDataPresentation(data))
    .catch(error => showError(error, document.querySelector(".wrapper")))
    
function defaultDataPresentation(data) {
    const doctors = data[0];
    const docCategory = Object.keys(doctors[0]);
    const transactions = data[1];
    const tranCategory = Object.keys(transactions[0]);

    //Build doctors and transactions tables
    let parentElement = document.querySelector(".doc-cont");
    buildTable("doctors", docCategory, parentElement, doctors);
    parentElement = document.querySelector(".tran-cont");
    buildTable("transactions", tranCategory, parentElement, transactions);
 
    //Show trigger button and set event listener
    const trigger = document.querySelector(".trigger");
    trigger.classList.remove("hidden");
    trigger.addEventListener("click", showRequiredData);
}

function buildTable(name, category, parent, data) {
    //Add a table title
    const title = document.createElement("h3");
    title.classList.add("table-title");
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    title.innerText = nameCapitalized;
    parent.appendChild(title);
    
    //Build a table
    const table = document.createElement("table");
    table.classList.add(name);
    const tableHead = document.createElement("thead");
    const tr = table.insertRow(-1);
    category.forEach(cat => {
        const th = document.createElement("th");
        th.innerHTML = cat;
        tr.appendChild(th);
    })
    tableHead.appendChild(tr);
    table.insertBefore(tableHead, table.childNodes[0]);
    parent.appendChild(table);
    
    //Fill the table with data
    data.forEach(el => {
        const tr = table.insertRow(-1);
        const keys = Object.keys(el);
        for (let i = 0; i < keys.length; i++) {
            const cell = tr.insertCell(-1);
            cell.innerHTML = el[keys[i]];
            tr.appendChild(cell);
        }
        table.childNodes[1].appendChild(tr);
    })
}

function showRequiredData() {
    fetch("requireddata.php")
        .then(res => res.json())
        .then(data => resultsPresentation(data))
        .catch(error => showError(error, document.querySelector(".rslt-table")))
}

function resultsPresentation(data) {
    const category = ["Ф.И.О.", "Специальность", "Зарплата за 2019 г."];
    const parent = document.querySelector(".rslt-table");
    buildTable("results", category, parent, data);
    document.querySelector(".trigger").classList.add("hidden");
}

function showError(error, parent) {
    console.log(error);
    const h2 = document.createElement("h2");
    h2.innerHTML = "Ошибка при загрузке данных...";
    parent.appendChild(h2);
    //If  error occured after click on a button
    if (parent.classList.contains("rslt-table")) {
        document.querySelector(".trigger").setAttribute("disabled", "true");
    }
}