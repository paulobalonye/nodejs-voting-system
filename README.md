# Node.js Election Voting System

A complete, secure voting system built with Node.js and Express for conducting elections.

## Features

- **Secure Voting Interface**: Clean, professional interface for casting votes
- **Real-time Results**: Live vote tracking with percentages and visual charts
- **Admin Panel**: Complete election management dashboard
- **Duplicate Prevention**: IP-based voting restrictions (one vote per IP)
- **Responsive Design**: Works on desktop and mobile devices

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nodejs-voting-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Voting
- Navigate to `http://your-server:3000` to cast votes
- Select a candidate and click "Cast Your Vote"

### Results
- View live results at `http://your-server:3000/results`
- Results update automatically every 10 seconds

### Admin Panel
- Access admin controls at `http://your-server:3000/admin`
- Reset votes, export results, and monitor election status

## Deployment

### Digital Ocean Deployment

1. **Server Setup** (Ubuntu 20.04+):
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

2. **Deploy Application**:
```bash
# Clone repository
git clone <your-repo-url>
cd nodejs-voting-system

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "voting-system"
pm2 startup
pm2 save
```

3. **Firewall Setup**:
```bash
# Allow port 3000
sudo ufw allow 3000
sudo ufw enable
```

## API Endpoints

- `GET /` - Voting interface
- `GET /results` - Results page
- `GET /admin` - Admin panel
- `GET /api/candidates` - Get all candidates
- `GET /api/votes` - Get current vote counts
- `POST /api/vote` - Submit a vote
- `POST /api/reset` - Reset all votes (admin)

## Security Features

- IP-based duplicate vote prevention
- Input validation and sanitization
- Secure API endpoints

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern gradient design with responsive layout
- **Process Management**: PM2
- **Version Control**: Git

## License

MIT License
