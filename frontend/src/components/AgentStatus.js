// components/AgentStatus.js - Real 4 Specialized Agents
import React from 'react';

const AgentStatus = ({ statuses, overallStatus, agentCount = 4 }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return '●';
      case 'completed': return '✓';
      case 'error': return '✗';
      default: return '○';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getAgentCardClass = (status) => {
    let baseClass = 'agent-card';
    if (status === 'running') baseClass += ' processing';
    if (status === 'completed') baseClass += ' completed';
    if (status === 'error') baseClass += ' error';
    return baseClass;
  };

  // Helper function to get agent status safely
  const getAgentStatus = (agentKey) => {
    return statuses[agentKey] || { status: 'ready', progress: 0, message: '' };
  };

  return (
    <div className="card">
      <h2>Real 4-Agent Specialized Analysis</h2>
      
      <div className="ai-system-info">
        <p className="ai-description">
          <strong>Sequential Multi-Agent System:</strong> 4 specialized AI agents with true expertise domains
        </p>
        <div className="ai-agents-list">
          <span>HR Skills Analyst</span>
          <span>Psychology Expert</span>
          <span>Technical Architect</span>
          <span>Executive Strategist</span>
        </div>
      </div>
      
      <div className="agent-grid">
        {/* Agent 1: HR Skills Analyst */}
        <div className={getAgentCardClass(getAgentStatus('hrSkillsAnalyst').status)}>
          <div className="agent-header">
            <h3>HR Skills Analyst</h3>
            <span className="status-icon" style={{ color: getStatusColor(getAgentStatus('hrSkillsAnalyst').status) }}>
              {getStatusIcon(getAgentStatus('hrSkillsAnalyst').status)}
            </span>
          </div>
          <div className="agent-status">
            <p>{getAgentStatus('hrSkillsAnalyst').message || 'Ready for technical skills assessment'}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${getAgentStatus('hrSkillsAnalyst').progress || 0}%`,
                  backgroundColor: getStatusColor(getAgentStatus('hrSkillsAnalyst').status)
                }}
              />
            </div>
            <span className="progress-text">{getAgentStatus('hrSkillsAnalyst').progress || 0}%</span>
          </div>
          <div className="agent-description">
            <small>Technical capability assessment & experience evaluation</small>
          </div>
        </div>

        {/* Agent 2: Psychology Expert */}
        <div className={getAgentCardClass(getAgentStatus('psychologyExpert').status)}>
          <div className="agent-header">
            <h3>Psychology Expert</h3>
            <span className="status-icon" style={{ color: getStatusColor(getAgentStatus('psychologyExpert').status) }}>
              {getStatusIcon(getAgentStatus('psychologyExpert').status)}
            </span>
          </div>
          <div className="agent-status">
            <p>{getAgentStatus('psychologyExpert').message || 'Ready for MBTI compatibility analysis'}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${getAgentStatus('psychologyExpert').progress || 0}%`,
                  backgroundColor: getStatusColor(getAgentStatus('psychologyExpert').status)
                }}
              />
            </div>
            <span className="progress-text">{getAgentStatus('psychologyExpert').progress || 0}%</span>
          </div>
          <div className="agent-description">
            <small>MBTI personality analysis & team dynamics prediction</small>
          </div>
        </div>

        {/* Agent 3: Technical Architect */}
        <div className={getAgentCardClass(getAgentStatus('techArchitect').status)}>
          <div className="agent-header">
            <h3>Technical Architect</h3>
            <span className="status-icon" style={{ color: getStatusColor(getAgentStatus('techArchitect').status) }}>
              {getStatusIcon(getAgentStatus('techArchitect').status)}
            </span>
          </div>
          <div className="agent-status">
            <p>{getAgentStatus('techArchitect').message || 'Ready for technical feasibility assessment'}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${getAgentStatus('techArchitect').progress || 0}%`,
                  backgroundColor: getStatusColor(getAgentStatus('techArchitect').status)
                }}
              />
            </div>
            <span className="progress-text">{getAgentStatus('techArchitect').progress || 0}%</span>
          </div>
          <div className="agent-description">
            <small>Project feasibility & technical risk assessment</small>
          </div>
        </div>

        {/* Agent 4: Executive Strategist */}
        <div className={getAgentCardClass(getAgentStatus('executiveStrategist').status)}>
          <div className="agent-header">
            <h3>Executive Strategist</h3>
            <span className="status-icon" style={{ color: getStatusColor(getAgentStatus('executiveStrategist').status) }}>
              {getStatusIcon(getAgentStatus('executiveStrategist').status)}
            </span>
          </div>
          <div className="agent-status">
            <p>{getAgentStatus('executiveStrategist').message || 'Ready for business optimization'}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${getAgentStatus('executiveStrategist').progress || 0}%`,
                  backgroundColor: getStatusColor(getAgentStatus('executiveStrategist').status)
                }}
              />
            </div>
            <span className="progress-text">{getAgentStatus('executiveStrategist').progress || 0}%</span>
          </div>
          <div className="agent-description">
            <small>Business strategy synthesis & final recommendations</small>
          </div>
        </div>
      </div>

      {/* Sequential Processing Indicator */}
      <div className="sequential-processing">
        <h4>Sequential Processing Flow</h4>
        <div className="processing-flow">
          <div className={`flow-step ${getAgentStatus('hrSkillsAnalyst').status === 'completed' ? 'completed' : getAgentStatus('hrSkillsAnalyst').status === 'running' ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Skills Analysis</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className={`flow-step ${getAgentStatus('psychologyExpert').status === 'completed' ? 'completed' : getAgentStatus('psychologyExpert').status === 'running' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">MBTI Analysis</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className={`flow-step ${getAgentStatus('techArchitect').status === 'completed' ? 'completed' : getAgentStatus('techArchitect').status === 'running' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Tech Assessment</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className={`flow-step ${getAgentStatus('executiveStrategist').status === 'completed' ? 'completed' : getAgentStatus('executiveStrategist').status === 'running' ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Strategy Synthesis</span>
          </div>
        </div>
      </div>

      {overallStatus === 'running' && (
        <div className="ai-thinking-indicator">
          <div className="thinking-animation">
            <div className="thinking-dot"></div>
            <div className="thinking-dot"></div>
            <div className="thinking-dot"></div>
          </div>
          <p>Specialized agents are analyzing sequentially...</p>
        </div>
      )}

      {overallStatus === 'completed' && (
        <div className="ai-completion-message">
          <p>4-Agent specialized analysis complete - All expertise domains analyzed</p>
        </div>
      )}
    </div>
  );
};

export default AgentStatus;