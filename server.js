const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for votes (in production, use a database)
let votes = {};
let candidates = [
    { id: 1, name: 'John Smith', party: 'Democratic Party' },
    { id: 2, name: 'Sarah Johnson', party: 'Republican Party' },
    { id: 3, name: 'Mike Davis', party: 'Independent' },
    { id: 4, name: 'Lisa Brown', party: 'Green Party' }
];

// Initialize votes for each candidate
candidates.forEach(candidate => {
    votes[candidate.id] = 0;
});

// Store voted IPs to prevent duplicate voting (simple implementation)
let votedIPs = new Set();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API Routes
app.get('/api/candidates', (req, res) => {
    res.json(candidates);
});

app.get('/api/votes', (req, res) => {
    const results = candidates.map(candidate => ({
        ...candidate,
        votes: votes[candidate.id]
    }));
    res.json(results);
});

app.post('/api/vote', (req, res) => {
    const { candidateId } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;

    // Check if IP has already voted
    if (votedIPs.has(clientIP)) {
        return res.status(400).json({ 
            success: false, 
            message: 'You have already voted!' 
        });
    }

    // Validate candidate ID
    const candidate = candidates.find(c => c.id === parseInt(candidateId));
    if (!candidate) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid candidate selected!' 
        });
    }

    // Record the vote
    votes[candidateId]++;
    votedIPs.add(clientIP);

    res.json({ 
        success: true, 
        message: `Vote recorded for ${candidate.name}!` 
    });
});

// Admin route to reset votes
app.post('/api/reset', (req, res) => {
    candidates.forEach(candidate => {
        votes[candidate.id] = 0;
    });
    votedIPs.clear();
    
    res.json({ 
        success: true, 
        message: 'All votes have been reset!' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Voting System is running on http://localhost:${PORT}`);
    console.log(`Access the voting interface at: http://localhost:${PORT}`);
    console.log(`View results at: http://localhost:${PORT}/results`);
    console.log(`Admin panel at: http://localhost:${PORT}/admin`);
});
