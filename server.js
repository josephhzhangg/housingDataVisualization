const express = require('express');
const cors = require('cors');
const app = express();

// Allow cross-origin requests for development purposes
app.use(cors());

// Body parser middleware to handle JSON payloads
app.use(express.json());

// Dummy data for the correlation matrix
const correlationMatrix = {
  longitude: { /* ...correlations... */ },
  rooms_per_household: { /* ...correlations... */ },
  // ... other categories ...
};

app.post('/get-correlation', (req, res) => {
  const { category1, category2 } = req.body;

  console.log("POST POST POST")
  // Retrieve the correlation from your matrix
  // This is just a placeholder; you'll replace it with your actual logic
  const correlationValue = correlationMatrix[category1][category2] || null;
  
  // Send back the correlation value or an error if not found
  if (correlationValue !== null) {
    res.json({ correlation: correlationValue });
  } else {
    res.status(404).json({ error: 'Correlation not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
