const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

let slots = [
  { time: "10:00 AM", booked: false, name: "" },
  { time: "11:00 AM", booked: false, name: "" },
  { time: "12:00 PM", booked: false, name: "" },
  { time: "1:00 PM", booked: false, name: "" },
  { time: "2:00 PM", booked: false, name: "" },
  { time: "3:00 PM", booked: false, name: "" },
  { time: "4:00 PM", booked: false, name: "" },
  { time: "5:00 PM", booked: false, name: "" }
];

// Get all slots
app.get('/slots', (req, res) => {
  res.json(slots);
});

// Book a slot
// POST book a slot
app.post('/book', (req, res) => {
  console.log('POST /book request received:', req.body);
  const { name, time } = req.body;
  const slot = slots.find(s => s.time === time);
  if (slot && !slot.booked) {
    slot.booked = true;
    slot.name = name;
    res.json({ success: true, message: "Slot booked!" });
  } else {
    res.status(400).json({ success: false, message: "Slot already booked or not found." });
  }
});

// POST cancel a slot
app.post('/cancel', (req, res) => {
  console.log('POST /cancel request received:', req.body);
  const { time } = req.body;
  const slot = slots.find(s => s.time === time);
  if (slot && slot.booked) {
    slot.booked = false;
    slot.name = "";
    res.json({ success: true, message: "Slot cancelled." });
  } else {
    res.status(400).json({ success: false, message: "Slot not found or not booked." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
