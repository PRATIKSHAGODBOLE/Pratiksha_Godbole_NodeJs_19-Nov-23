function showAdoptForm() {
    document.getElementById('adoptForm').style.display = 'block';
    document.getElementById('giveAwayForm').style.display = 'none';
}

function showGiveAwayForm() {
    document.getElementById('giveAwayForm').style.display = 'block';
    document.getElementById('adoptForm').style.display = 'none';
}

function submitAdoptForm(event) {
    event.preventDefault();
    const form = event.target;
    // Additional client-side validation if needed
    form.submit();
}

function submitGiveAwayForm(event) {
    event.preventDefault();
    const form = event.target;
    // Additional client-side validation if needed
    form.submit();
}

function showPetCatalog() {
    // Fetch available pets from the server and display in a table or list
    fetch('/pets')
        .then(response => response.json())
        .then(data => {
            const petsTable = document.createElement('table');
            petsTable.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                </tr>
            `;
            data.pets.forEach(pet => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pet.name}</td>
                    <td>${pet.breed}</td>
                    <td>${pet.age}</td>
                `;
                petsTable.appendChild(row);
            });
            document.body.appendChild(petsTable);
        })
        .catch(error => console.error('Error fetching pets:', error));
}
