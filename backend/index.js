const express = require('express');
const cors = require('cors');
require('dotenv').config();

const resumeRoutes = require('./src/routes/resumeRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const interviewRoutes = require('./src/routes/interviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resumeRoutes);
app.use('/api', aiRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/interview', interviewRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
