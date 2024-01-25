// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Sample data storage (replace with your database logic)
let savedData = [];

app.get('/', (req, res) => {
  res.send('Hello, this is your root endpoint!');
});

app.post('/validate', (req, res) => {
  const data = req.body;

  // Sample validation: Check if BMI is within a certain range
  const isValidData = data.every(d => d.BMI >= 0 && d.BMI <= 40);

  if (isValidData) {
    // Your save logic here (this is just an example, you need to implement your own logic)
    // In a real-world scenario, you might save the data to a database or perform other operations
    savedData = data;

    res.json({ success: true, message: 'Data validated and saved successfully.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data. BMI should be between 0 and 40.' });
  }
});

app.get('/getSavedData', (req, res) => {
  res.json(savedData);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
