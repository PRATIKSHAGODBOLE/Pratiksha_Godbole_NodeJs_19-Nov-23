const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json'); // Use a JSON file as a simple database
const db = low(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

db.defaults({ pets: [] }).write(); // Initialize a 'pets' collection

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/adopt', (req, res) => {
  const formData = req.body;
  if (!formData.name || !formData.breed || !formData.age) {
    return res.status(400).send('Invalid form data');
  }

  db.get('pets')
    .push({ name: formData.name, breed: formData.breed, age: formData.age })
    .write();

  res.send('Adoption request submitted successfully');
});

app.post('/giveAway', (req, res) => {
  const formData = req.body;
  if (!formData.petType || !formData.name || !formData.age) {
    return res.status(400).send('Invalid form data');
  }

  db.get('pets')
    .push({ name: formData.name, breed: formData.petType, age: formData.age })
    .write();

  res.send('Give away request submitted successfully');
});

app.get('/pets', (req, res) => {
  const pets = db.get('pets').value();
  res.json({ pets });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
