// App.js - Updated for Real 4-Agent System with MBTI
import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectRequirements from './components/ProjectRequirements';
import PersonnelPool from './components/PersonnelPool';
import AgentStatus from './components/AgentStatus';
import OptimizationResults from './components/OptimizationResults';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [personnelData, setPersonnelData] = useState([]);
  const [projectRequirements, setProjectRequirements] = useState({});
  const [optimizationStatus, setOptimizationStatus] = useState('idle');
  const [agentStatuses, setAgentStatuses] = useState({
    hrSkillsAnalyst: { status: 'ready', progress: 0, message: '' },
    psychologyExpert: { status: 'ready', progress: 0, message: '' },
    techArchitect: { status: 'ready', progress: 0, message: '' },
    executiveStrategist: { status: 'ready', progress: 0, message: '' }
  });
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [wsConnection, setWsConnection] = useState(null);

  // Initialize sample data with MBTI types
  useEffect(() => {
    const samplePersonnel = [
      {
        id: 1,
        name: "Alice Johnson",
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        experience: "senior",
        personality: "leadership",
        mbtiType: "ENTJ",
        experienceYears: 8,
        availability: "full-time",
        hourlyRate: 85
      },
      {
        id: 2,
        name: "Bob Smith",
        skills: ["Python", "Django", "PostgreSQL", "Docker"],
        experience: "mid",
        personality: "analytical", 
        mbtiType: "INTJ",
        experienceYears: 4,
        availability: "full-time",
        hourlyRate: 65
      },
      {
        id: 3,
        name: "Carol Davis",
        skills: ["UI/UX", "React", "CSS", "Figma"],
        experience: "mid",
        personality: "creative",
        mbtiType: "ENFP",
        experienceYears: 5,
        availability: "full-time",
        hourlyRate: 70
      },
      {
        id: 4,
        name: "David Wilson",
        skills: ["Java", "Spring", "Microservices", "AWS"],
        experience: "senior",
        personality: "detail-oriented",
        mbtiType: "ISTJ",
        experienceYears: 7,
        availability: "full-time",
        hourlyRate: 90
      },
      {
        id: 5,
        name: "Emma Brown",
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
        experience: "senior",
        personality: "analytical",
        mbtiType: "INTP",
        experienceYears: 6,
        availability: "full-time",
        hourlyRate: 95
      },
      {
        id: 6,
        name: "Frank Miller",
        skills: ["JavaScript", "Vue.js", "Express", "Redis"],
        experience: "junior",
        personality: "collaborative",
        mbtiType: "ESFJ",
        experienceYears: 2,
        availability: "full-time",
        hourlyRate: 45
      },
      {
        id: 7,
        name: "Grace Lee",
        skills: ["DevOps", "Kubernetes", "CI/CD", "Terraform"],
        experience: "mid",
        personality: "detail-oriented",
        mbtiType: "ISTP",
        experienceYears: 4,
        availability: "contract",
        hourlyRate: 75
      },
      {
        id: 8,
        name: "Henry Chen",
        skills: ["Mobile", "React Native", "iOS", "Android"],
        experience: "senior",
        personality: "creative",
        mbtiType: "ENFJ",
        experienceYears: 9,
        availability: "part-time",
        hourlyRate: 100
      }
    ];
    setPersonnelData(samplePersonnel);
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(`ws://localhost:8000/ws`);
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleAgentUpdate(data);
        };

        ws.onopen = () => {
          console.log('WebSocket connected to AI system');
          setWsConnection(ws);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected from AI system');
          setWsConnection(null);
          setTimeout(connectWebSocket, 3000);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        return ws;
      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
        return null;
      }
    };

    const ws = connectWebSocket();
    return () => { if (ws) ws.close(); };
  }, []);

  const handleAgentUpdate = (data) => {
    const { agent_type, status, progress, message, results } = data;
    
    setAgentStatuses(prev => ({
      ...prev,
      [agent_type]: { status, progress, message }
    }));

    if (results) {
      setOptimizationResults(results);
      setOptimizationStatus('completed');
    }

    if (status === 'error') {
      setOptimizationStatus('error');
    }
  };

  const addPerson = (person) => {
    const newPerson = { ...person, id: Date.now() + Math.random() };
    setPersonnelData(prev => [...prev, newPerson]);
  };

  const removePerson = (id) => {
    setPersonnelData(prev => prev.filter(person => person.id !== id));
  };

  const updateProjectRequirements = (requirements) => {
    setProjectRequirements(requirements);
  };

  const startOptimization = async () => {
    if (personnelData.length === 0) {
      alert('Please add personnel to the pool');
      return;
    }

    if (!projectRequirements.projectName || !projectRequirements.teamSize) {
      alert('Please complete project requirements');
      return;
    }

    if (projectRequirements.teamSize > personnelData.length) {
      alert(`Team size (${projectRequirements.teamSize}) exceeds available personnel (${personnelData.length})`);
      return;
    }

    setOptimizationStatus('running');
    setOptimizationResults(null);
    
    // Initialize 4 real agents
    setAgentStatuses({
      hrSkillsAnalyst: { status: 'ready', progress: 0, message: 'Initializing skills assessment...' },
      psychologyExpert: { status: 'ready', progress: 0, message: 'Preparing MBTI analysis...' },
      techArchitect: { status: 'ready', progress: 0, message: 'Loading technical requirements...' },
      executiveStrategist: { status: 'ready', progress: 0, message: 'Preparing business optimization...' }
    });
    
    const requestData = {
      requirements: {
        projectName: projectRequirements.projectName,
        teamSize: parseInt(projectRequirements.teamSize),
        skills: Array.isArray(projectRequirements.skills) ? projectRequirements.skills : [],
        projectType: projectRequirements.projectType,
        priority: projectRequirements.priority,
        timeline: projectRequirements.timeline || null,
        budget: projectRequirements.budget || null
      },
      personnel: personnelData.map(person => ({
        id: person.id,
        name: person.name,
        skills: Array.isArray(person.skills) ? person.skills : [],
        experience: person.experience,
        personality: person.personality,
        mbtiType: person.mbtiType || null,
        experienceYears: parseInt(person.experienceYears) || 1,
        availability: person.availability || 'full-time',
        hourlyRate: parseFloat(person.hourlyRate) || 0.0
      }))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/optimize-team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.data && !optimizationResults) {
        setOptimizationResults(result.data);
        setOptimizationStatus('completed');
      }

    } catch (error) {
      console.error('Optimization error:', error);
      setOptimizationStatus('error');
      
      setAgentStatuses(prev => ({
        hrSkillsAnalyst: { status: 'error', progress: 0, message: `Skills analysis failed: ${error.message}` },
        psychologyExpert: { status: 'error', progress: 0, message: 'Psychology analysis cancelled' },
        techArchitect: { status: 'error', progress: 0, message: 'Technical analysis cancelled' },
        executiveStrategist: { status: 'error', progress: 0, message: 'Strategic analysis cancelled' }
      }));

      if (error.message.includes('fetch')) {
        alert('Cannot connect to AI backend. Ensure server is running on http://localhost:8000');
      } else {
        alert(`Optimization failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">TeamAI</span>
          </div>
          <div className="version-badge">v3.0</div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-title">Configuration</div>
            <div className="nav-item active">
              <span className="nav-icon"></span>
              4-Agent Optimizer
            </div>
          </div>
          
          <div className="nav-section">
            <div className="nav-title">System Status</div>
            <div className="nav-item">
              <span className={`status-dot ${wsConnection ? 'connected' : 'disconnected'}`}></span>
              {wsConnection ? 'AI Connected' : 'Disconnected'}
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-title">Features</div>
            <div className="nav-item">
              <span className="nav-icon"></span>
              MBTI Integration
            </div>
            <div className="nav-item">
              <span className="nav-icon"></span>
              Sequential Processing
            </div>
          </div>
        </nav>
      </div>

      <div className="main-content">
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="app-title">TeamForge AI - Team Formation Optimizer</h1>
              <p className="app-subtitle">Specialized AI agents with MBTI personality integration and sequential analysis</p>
            </div>
            <div className="header-right">
              <div className="system-metrics">
                <div className="metric">
                  <span className="metric-label">Personnel Pool</span>
                  <span className="metric-value">{personnelData.length}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Status</span>
                  <span className={`metric-value status-${optimizationStatus}`}>
                    {optimizationStatus.charAt(0).toUpperCase() + optimizationStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="input-section">
            <div className="section-header">
              <h2 className="section-title">Configuration</h2>
              <div className="section-subtitle">Define project parameters and available resources with MBTI personality types</div>
            </div>
            
            <div className="input-grid">
              <ProjectRequirements 
                onUpdate={updateProjectRequirements}
                requirements={projectRequirements}
              />
              
              <PersonnelPool 
                personnel={personnelData}
                onAddPerson={addPerson}
                onRemovePerson={removePerson}
                mbtiEnabled={true}
              />
            </div>
          </div>

          <div className="action-section">
            <button 
              className={`primary-action ${optimizationStatus === 'running' ? 'loading' : ''}`}
              onClick={startOptimization}
              disabled={optimizationStatus === 'running'}
            >
              <span className="action-icon"></span>
              {optimizationStatus === 'running' ? 'Analyzing with 4 Agents...' : 'Start 4-Agent Analysis'}
            </button>
            
            {optimizationStatus === 'error' && (
              <div className="error-alert">
                <span className="alert-icon"></span>
                <span>4-Agent optimization failed. Please verify configuration and try again.</span>
              </div>
            )}
          </div>

          {optimizationStatus !== 'idle' && (
            <div className="analysis-section">
              <div className="section-header">
                <h2 className="section-title">4-Agent Specialized Analysis</h2>
                <div className="section-subtitle">Sequential processing by specialized AI agents</div>
              </div>
              <AgentStatus 
                statuses={agentStatuses}
                overallStatus={optimizationStatus}
                agentCount={4}
              />
            </div>
          )}

          {optimizationResults && (
            <div className="results-section">
              <div className="section-header">
                <h2 className="section-title">4-Agent Optimization Results</h2>
                <div className="section-subtitle">Specialized AI agent recommendations with MBTI analysis</div>
              </div>
              <OptimizationResults results={optimizationResults} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;