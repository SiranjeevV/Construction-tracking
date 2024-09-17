import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyAp8ulWYf1T2XSPS07_NoTK8H01vNjqET8",
    authDomain: "real-estate-tracking-8ca71.firebaseapp.com",
    databaseURL: "https://real-estate-tracking-8ca71-default-rtdb.firebaseio.com",
    projectId: "real-estate-tracking-8ca71",
    storageBucket: "real-estate-tracking-8ca71.appspot.com",
    messagingSenderId: "912329992919",
    appId: "1:912329992919:web:430c109fcf02996df05e92",
    measurementId: "G-FFBJ6X1ZS9"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, remove, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
const database = getDatabase(app);
const dbRef = ref(database);
const idArr = [];
get(child(dbRef, 'clients/')).then((res) => {
    const clientProjectList = res.val();
    let myDiv = document.querySelector('#clientsList');
    let myTable = document.querySelector('#clientsTableBody');
    for (const id in clientProjectList) {
        let i = id;
        const recId = clientProjectList[i].id;
        idArr.push(recId);
        let myClassRow = document.createElement('div');
        let myButton = document.createElement('button');
        let myButton2 = document.createElement('button');
        let myButtonsRow = document.createElement('div');
        myButtonsRow.classList.add('buttons-section');
        myButtonsRow.classList.add('mt-2');

        let myTableRow = document.createElement('tr');
        let myTableData1 = document.createElement('td');
        let myTableData2 = document.createElement('td');
        let myTableData3 = document.createElement('td');
        let myTableData4 = document.createElement('td');
        let myTableData5 = document.createElement('td');
        myTableData1.textContent = clientProjectList[i].id;
        myTableData2.textContent = clientProjectList[i].name;
        myTableData3.textContent = clientProjectList[i].email;
        myTableData4.textContent = clientProjectList[i].projects.name;
        myTableData5.textContent = clientProjectList[i].projects.status;
        myButton.classList.add('buttons');
        myButton2.classList.add('update');
        myButton.classList.add('button');
        myButton2.classList.add('button');
        myButton.classList.add('p-4');
        myButton2.classList.add('p-4');
        myButtonsRow.appendChild(myButton);
        myButtonsRow.appendChild(myButton2);
        myTableRow.classList.add('table-row');
        myTableRow.appendChild(myTableData1);
        myTableRow.appendChild(myTableData2);
        myTableRow.appendChild(myTableData3);
        myTableRow.appendChild(myTableData4);
        myTableRow.appendChild(myTableData5);
        myTable.appendChild(myTableRow);
        myButton.addEventListener('click', () => {
            const confirmDelete = window.confirm("Are you sure you want to delete this client?");
            if (confirmDelete) {
                remove(child(dbRef, `clients/${i}`))
                    .then(data => {
                        window.location.reload();
                        console.log('Client deleted:', data)
                    });
            }
        });
        let myLink = document.createElement('a');
        myLink.href = `tracking.html?id=${recId}`;
        myLink.textContent = `View ${clientProjectList[i].name}'s Details`;
        let first = document.createElement('strong');
        let second = document.createElement('strong');
        let third = document.createElement('strong');
        let four = document.createElement('strong');
        myDiv.appendChild(myClassRow);
        myButton.innerText = "delete";
        myButton2.innerText = "update";
        myClassRow.classList.add('col-lg-3');
        myClassRow.appendChild(four);
        myClassRow.appendChild(first);
        myClassRow.appendChild(second);
        myClassRow.appendChild(third);
        myClassRow.appendChild(myLink);
        myClassRow.appendChild(myButtonsRow);
        const nameOfClient = clientProjectList[i].name;
        first.textContent = "name: " + nameOfClient;
        const mailOfClient = clientProjectList[i].email;
        second.textContent = "mail: " + mailOfClient;
        third.textContent = "stage: " + clientProjectList[i].projects.status;
        four.textContent = "ID: " + recId;
        myButton2.addEventListener('click', () => {
            document.getElementById('input-form').classList.toggle('activate');
            document.getElementById('input2').classList.toggle('show');
            document.getElementById('updateButton').addEventListener('click', () => {
                const projectRef = ref(database, `clients/${i}/projects`);
                update(projectRef, {
                    name: clientProjectList[i].projects.name,
                    status: document.getElementById('tracking-updated').value
                })
                    .then(data => {
                        window.location.reload();
                        console.log('Client deleted:', data)
                    });
            })
        });
    }
    console.log(idArr);
    // const clientList = document.getElementById("clientsList");
    function addClient() {
        document.getElementById('input').classList.toggle('show');
        document.getElementById('input-form').classList.toggle('activate');
    }
    // function storeClients() {
    //     const clientRef = ref(database, `clients/${document.getElementById('id').value}`); // Reference using client id as key
    //     // const client =
    //     let idCheck = document.getElementById('id').value;
    //     if (idArr.length === 0) {
    //         set(clientRef, {
    //             "name": document.getElementById('name').value,
    //             "email": document.getElementById('mail').value,
    //             "projects": {
    //                 "name": document.getElementById('building').value,
    //                 "status": document.getElementById('tracking').value
    //             },
    //             "id": idCheck

    //         }).then(() => {
    //             window.location.reload();
    //             console.log("Client added successfully.");
    //         }).catch((error) => {
    //             console.error("Error adding client: ", error);
    //         });
    //     }
    //     else {
    //         idArr.forEach((value) => {
    //             if (value == idCheck) {
    //                 alert('Id is already defined');
    //                 return;
    //             } else {
    //                 set(clientRef, {
    //                     "name": document.getElementById('name').value,
    //                     "email": document.getElementById('mail').value,
    //                     "projects": {
    //                         "name": document.getElementById('building').value,
    //                         "status": document.getElementById('tracking').value
    //                     },
    //                     "id": idCheck

    //                 }).then(() => {
    //                     window.location.reload();
    //                     console.log("Client added successfully.");
    //                 }).catch((error) => {
    //                     console.error("Error adding client: ", error);
    //                 });
    //             }
    //         })
    //     }
    // }
    function storeClients() {
        const clientRef = ref(database, `clients/${document.getElementById('id').value}`); // Reference using client id as key
        let idCheck = document.getElementById('id').value;
        let idExists = false;
        if (idArr.length === 0) {
            adding(clientRef, idCheck);
        } else {
            idArr.forEach((value) => {
                if (value == idCheck) {
                    idExists = true;
                }
            });
            if (idExists) {
                alert('Id is already defined');
                return;
            } else {
                adding(clientRef, idCheck);
            }
        }
    }
    function adding(clientRef, idCheck) {
        set(clientRef, {
            "name": document.getElementById('name').value,
            "email": document.getElementById('mail').value,
            "projects": {
                "name": document.getElementById('building').value,
                "status": document.getElementById('tracking').value
            },
            "id": idCheck
        }).then(() => {
            window.location.reload();
            console.log("Client added successfully.");
        }).catch((error) => {
            console.error("Error adding client: ", error);
        });
    }

    document.getElementById('addClientBtn').addEventListener('click', addClient);
    document.getElementById('addButton').addEventListener('click', storeClients);
    document.getElementById('changeView').addEventListener('click', () => {
        if (document.getElementById('changeView').innerHTML === "Table view") {
            document.getElementById('changeView').innerHTML = "Card view";
        } else {
            document.getElementById('changeView').innerHTML = "Table view";
        }
        document.getElementById('clientsTable').classList.toggle('showTable');
        document.getElementById('cardContainer').classList.toggle('hideCards');

    });

    document.getElementById('backButton').addEventListener('click', () => {
        document.getElementById('input2').classList.toggle('show');
        document.getElementById('input-form').classList.toggle('activate');
    });
    document.getElementById('back').addEventListener('click', () => {
        document.getElementById('input').classList.toggle('show');
        document.getElementById('input-form').classList.toggle('activate');
    });
})