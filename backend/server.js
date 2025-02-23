const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Sample Data (API Endpoint)
app.get('/api/data', (req, res) => {
    res.json([
        { month: 'Jan', sales: 50 },
        { month: 'Feb', sales: 65 },
        { month: 'Mar', sales: 80 },
        { month: 'Apr', sales: 95 },
        { month: 'May', sales: 120 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
