# TeamForge AI - Intelligent Team Formation Optimizer
> **Revolutionizing team formation through specialized AI agents and MBTI psychology integration**

TeamForge AI is an advanced multi-agent system that optimizes team composition using 4 specialized AI agents, real-time analysis, and psychological compatibility assessment. Built with CrewAI and Google Gemini, it delivers enterprise-grade team recommendations through sequential AI processing.

##  Key Features

-  **4 Specialized AI Agents** - HR Analyst, Psychology Expert, Technical Architect, Executive Strategist
-  **MBTI Psychology Integration** - 16-type personality compatibility with research-based scoring
-  **Real-Time Processing** - Live agent progress tracking via WebSocket connections
-  **Sequential Analysis** - Each agent builds upon previous agents' insights
-  **Comprehensive Scoring** - Technical skills, personality fit, project feasibility, business optimization
-  **Professional UI/UX** - Modern React interface with responsive design
- **Enterprise Ready** - Scalable architecture, error handling, input validation

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React UI Components]
        WS[WebSocket Client]
        STATE[State Management]
    end
    
    subgraph "Backend Layer"
        API[FastAPI Server]
        WSS[WebSocket Server]
        ORCH[4-Agent Orchestrator]
    end
    
    subgraph "AI Agent Layer"
        HR[HR Skills Analyst]
        PSYCH[Psychology Expert]
        TECH[Technical Architect]
        EXEC[Executive Strategist]
    end
    
    subgraph "External Services"
        GEMINI[Google Gemini LLM]
        CREW[CrewAI Framework]
    end
    
    UI --> API
    WS <--> WSS
    API --> ORCH
    ORCH --> HR
    HR --> PSYCH
    PSYCH --> TECH
    TECH --> EXEC
    
    HR <--> GEMINI
    PSYCH <--> GEMINI
    TECH <--> GEMINI
    EXEC <--> GEMINI
    
    ORCH <--> CREW
    WSS --> WS
    
    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef ai fill:#fff3e0
    classDef external fill:#e8f5e8
    
    class UI,WS,STATE frontend
    class API,WSS,ORCH backend
    class HR,PSYCH,TECH,EXEC ai
    class GEMINI,CREW external
```

## 🔄 Agent Workflow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant HR as HR Skills Analyst
    participant Psych as Psychology Expert
    participant Tech as Technical Architect
    participant Exec as Executive Strategist
    
    User->>Frontend: Submit project requirements & personnel
    Frontend->>Backend: POST /optimize-team
    Backend->>Frontend: WebSocket connection established
    
    Note over Backend: Initialize 4-Agent Sequential Analysis
    
    Backend->>HR: Phase 1: Analyze technical skills
    HR-->>Backend: Skills assessment results
    Backend->>Frontend: HR Agent: 100% complete
    
    Backend->>Psych: Phase 2: MBTI compatibility analysis
    Note over Psych: Uses HR results + personality data
    Psych-->>Backend: Team dynamics predictions
    Backend->>Frontend: Psychology Agent: 100% complete
    
    Backend->>Tech: Phase 3: Technical feasibility
    Note over Tech: Uses HR + Psychology insights
    Tech-->>Backend: Project risk assessment
    Backend->>Frontend: Technical Agent: 100% complete
    
    Backend->>Exec: Phase 4: Business optimization
    Note over Exec: Synthesizes all previous analyses
    Exec-->>Backend: Final team recommendations
    Backend->>Frontend: Executive Agent: 100% complete
    
    Backend->>Frontend: Complete results with 3 team options
    Frontend->>User: Display optimized teams
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Google API Key** for Gemini access

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/teamforge-ai.git
cd teamforge-ai
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment configuration
cp .env.example .env

# Edit .env file with your Google API key
echo "GOOGLE_API_KEY=your_gemini_api_key_here" >> .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Start Backend Server

```bash
# In backend directory (with venv activated)
python main.py
```

### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
teamforge-ai/
├── backend/
│   ├── main.py                 # FastAPI server & AI orchestration
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment template
│   └── README.md              # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React application
│   │   ├── App.css            # Styling & design system
│   │   └── components/
│   │       ├── ProjectRequirements.js
│   │       ├── PersonnelPool.js
│   │       ├── AgentStatus.js
│   │       └── OptimizationResults.js
│   ├── package.json           # Node.js dependencies
│   └── public/
│       └── index.html
├── docs/
│   ├── ARCHITECTURE.md        # Detailed system architecture
│   ├── API.md                 # API documentation
│   └── DEPLOYMENT.md          # Production deployment guide
├── .gitignore
├── LICENSE
└── README.md
```

## 🤖 AI Agent Specializations

### 1.  HR Skills Analyst
- **Focus**: Technical skills assessment, experience evaluation
- **Analysis**: Skill-job matching, capability gaps, experience scoring
- **Output**: Skill compatibility scores, experience ratings

### 2.  Psychology Expert
- **Focus**: MBTI personality types, team dynamics
- **Analysis**: 16-type compatibility matrix, conflict prediction
- **Output**: Team harmony scores, communication style assessment

### 3.  Technical Architect
- **Focus**: Project feasibility, technical requirements
- **Analysis**: Complexity assessment, delivery capability
- **Output**: Technical risk evaluation, architecture recommendations

### 4.  Executive Strategist
- **Focus**: Business optimization, final recommendations
- **Analysis**: ROI consideration, timeline feasibility, budget optimization
- **Output**: Ranked team options with business justification

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Required
GOOGLE_API_KEY=your_gemini_api_key_here

# Optional
PORT=8000
DEBUG=true
OPENAI_API_KEY=fake-key-for-crewai-validation
CREWAI_TELEMETRY_OPT_OUT=true
```

### API Configuration

The system exposes REST endpoints and WebSocket connections:

- `POST /optimize-team` - Start team optimization
- `GET /health` - System health check
- `WS /ws` - Real-time agent updates

### Environment Setup
```bash
# Production environment variables
GOOGLE_API_KEY=your_production_key
PORT=8000
DEBUG=false
DATABASE_URL=postgresql://user:pass@host:5432/teamforge
SENTRY_DSN=your_sentry_dsn
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Python: Black formatting, pylint linting
- JavaScript: ESLint + Prettier
- Commit messages: Conventional Commits format

## 📊 Metrics & Analytics

The system tracks various performance metrics:

- **Agent Processing Time**: Average time per agent phase
- **Team Optimization Success Rate**: Percentage of successful analyses
- **MBTI Accuracy**: Validation against known team performance
- **User Satisfaction**: Team recommendation acceptance rates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **CrewAI** - Multi-agent framework foundation
- **Google Gemini** - Advanced language model capabilities
- **MBTI Research** - Psychological compatibility foundations
- **FastAPI** - High-performance web framework
- **React** - Modern frontend development

<div align="center">
  <strong>Built with ❤️ using AI Agents and Modern Web Technologies</strong>
</div>

<div align="center">
  <sub>⭐ Star this repo if you find it helpful!</sub>
</div>
