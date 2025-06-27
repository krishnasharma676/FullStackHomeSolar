const express = require('express');
const cors = require('cors');
const solarRoutes = require('./routes/solarRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', solarRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
