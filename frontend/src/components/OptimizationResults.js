// components/OptimizationResults.js - Enhanced with better formatting
import React, { useState } from 'react';

const OptimizationResults = ({ results }) => {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  if (!results || !results.recommendations) {
    return null;
  }

  const { recommendations, metadata, aiAnalysis } = results;

  // Format metadata for better display
  const formatMetadata = () => {
    const formatted = [];
    if (metadata.confidence) {
      formatted.push({ label: 'AI Confidence', value: `${(metadata.confidence * 100).toFixed(1)}%`, type: 'confidence' });
    }
    if (metadata.totalCandidates) {
      formatted.push({ label: 'Candidates Analyzed', value: metadata.totalCandidates, type: 'count' });
    }
    if (metadata.processingMethod) {
      formatted.push({ label: 'Processing', value: metadata.processingMethod.replace(/_/g, ' '), type: 'method' });
    }
    if (metadata.aiAgentsUsed) {
      formatted.push({ label: 'AI Agents', value: metadata.aiAgentsUsed, type: 'agents' });
    }
    if (metadata.analysisDepth) {
      formatted.push({ label: 'Analysis', value: metadata.analysisDepth.replace(/_/g, ' '), type: 'depth' });
    }
    return formatted;
  };

  return (
    <div className="results-container">
      <div className="card">
        <div className="results-header">
          <h2>🎯 AI Team Recommendations</h2>
          <div className="metadata">
            {formatMetadata().map((item, index) => (
              <span key={index} className={`metadata-item ${item.type}`}>
                {item.label}: {item.value}
              </span>
            ))}
          </div>
        </div>

        {aiAnalysis && (
          <div className="ai-analysis-toggle">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAIAnalysis(!showAIAnalysis)}
            >
              {showAIAnalysis ? '🔒 Hide' : '🧠 Show'} Full AI Agent Analysis
            </button>
          </div>
        )}

        {showAIAnalysis && aiAnalysis && (
          <div className="ai-analysis-section">
            <h3>🤖 Complete AI Agent Collaboration Analysis</h3>
            <div className="ai-analysis-content">
              <pre>{aiAnalysis}</pre>
            </div>
            <p className="ai-analysis-note">
              <small>This shows the actual reasoning and collaboration between AI agents</small>
            </p>
          </div>
        )}

        <div className="team-tabs">
          {recommendations.map((rec, index) => (
            <button
              key={index}
              className={`team-tab ${selectedTeam === index ? 'active' : ''}`}
              onClick={() => setSelectedTeam(index)}
            >
              <div className="team-tab-content">
                <div className="team-rank">Team {rec.rank || (index + 1)}</div>
                <div className="team-score">
                  {rec.team?.overallScore ? (rec.team.overallScore * 100).toFixed(0) : '0'}%
                </div>
                {rec.team?.aiConfidence && (
                  <div className="ai-confidence">
                    AI: {(rec.team.aiConfidence * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {recommendations[selectedTeam] && (
          <TeamDetails recommendation={recommendations[selectedTeam]} />
        )}
      </div>
    </div>
  );
};

const TeamDetails = ({ recommendation }) => {
  const { team, reasoning, riskFactors, strengths, aiInsights } = recommendation;

  // Safe metric calculation
  const getMetricValue = (value, fallback = 0) => {
    const num = parseFloat(value);
    return isNaN(num) ? fallback : (num * 100).toFixed(0);
  };

  // Format team metrics safely
  const teamMetrics = [
    {
      label: 'Overall Score',
      value: getMetricValue(team?.overallScore),
      icon: '🎯'
    },
    {
      label: 'Performance',
      value: getMetricValue(team?.performance),
      icon: '⚡'
    },
    {
      label: 'Harmony',
      value: getMetricValue(1 - (team?.conflictRisk || 0)),
      icon: '🤝'
    },
    {
      label: 'Diversity',
      value: getMetricValue(team?.diversity),
      icon: '🌟'
    }
  ];

  if (team?.aiConfidence) {
    teamMetrics.push({
      label: 'AI Confidence',
      value: getMetricValue(team.aiConfidence),
      icon: '🧠',
      isAI: true
    });
  }

  return (
    <div className="team-details">
      {/* Team Overview Metrics */}
      <div className="team-overview">
        <div className="metrics-grid">
          {teamMetrics.map((metric, index) => (
            <div key={index} className={`metric ${metric.isAI ? 'ai-metric' : ''}`}>
              <div className="metric-value">{metric.value}%</div>
              <div className="metric-label">{metric.icon} {metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Card */}
      {aiInsights && (
        <div className="ai-insights-section">
          <div className="ai-insights-card">
            <h3>🧠 AI Agent Insights</h3>
            <p className="ai-insight">{aiInsights}</p>
          </div>
        </div>
      )}

      <div className="team-content">
        {/* Team Members Section */}
        <div className="team-members">
          <h3>👥 Team Members</h3>
          <div className="members-grid">
            {team?.members?.map((member, index) => (
              <MemberCard key={index} member={member} />
            )) || (
              <div className="empty-state">No team members data available</div>
            )}
          </div>
        </div>

        {/* Analysis Section */}
        <div className="analysis-section">
          {/* Strengths Card */}
          <div className="analysis-card">
            <h3>✨ AI-Identified Strengths</h3>
            <ul>
              {strengths && strengths.length > 0 ? (
                strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))
              ) : (
                <li>Strong team composition identified by AI analysis</li>
              )}
            </ul>
          </div>

          {/* Risk Factors Card */}
          {riskFactors && riskFactors.length > 0 && (
            <div className="analysis-card risk-card">
              <h3>⚠️ AI-Predicted Risk Factors</h3>
              <ul>
                {riskFactors.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Reasoning Card */}
          <div className="analysis-card">
            <h3>💡 AI Reasoning</h3>
            <ul>
              {reasoning && reasoning.length > 0 ? (
                reasoning.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))
              ) : (
                <li>Team recommended based on comprehensive AI analysis</li>
              )}
            </ul>
          </div>

          {/* AI Methodology Card */}
          <div className="analysis-card ai-methodology-card">
            <h3>🔬 AI Methodology</h3>
            <div className="methodology-steps">
              <div className="methodology-step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <strong>HR Analysis:</strong> Deep talent assessment and skill evaluation
                </div>
              </div>
              <div className="methodology-step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <strong>Strategic Planning:</strong> Multiple team composition strategies
                </div>
              </div>
              <div className="methodology-step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <strong>Psychology Assessment:</strong> Team dynamics and compatibility analysis
                </div>
              </div>
              <div className="methodology-step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <strong>Technical Evaluation:</strong> Feasibility and capability assessment
                </div>
              </div>
              <div className="methodology-step">
                <span className="step-number">5</span>
                <div className="step-content">
                  <strong>Executive Synthesis:</strong> Business-optimized final recommendations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberCard = ({ member }) => {
  const person = member?.person || {};
  
  // Safe score calculation
  const getScore = (value, fallback = 0) => {
    const num = parseFloat(value);
    return isNaN(num) ? fallback : (num * 100).toFixed(0);
  };

  const memberMetrics = [
    { label: 'Skill Match', value: getScore(member?.skillMatch) },
    { label: 'Experience', value: getScore(member?.experienceScore) }
  ];

  if (member?.personalityFit) {
    memberMetrics.push({ label: 'Personality Fit', value: getScore(member.personalityFit) });
  }

  return (
    <div className="member-card">
      <div className="member-header">
        <h4>{person.name || 'Unknown Member'}</h4>
        <span className="member-score">
          {getScore(member?.overallScore)}%
        </span>
      </div>
      
      <div className="member-details">
        <p><strong>Skills:</strong> {person.skills?.join(', ') || 'No skills listed'}</p>
        <p><strong>Experience:</strong> {person.experience || 'Unknown'} ({person.experienceYears || 0} years)</p>
        <p><strong>Personality:</strong> {person.personality || 'Not specified'}</p>
        
        {person.availability && (
          <p><strong>Availability:</strong> {person.availability}</p>
        )}
        
        {person.hourlyRate > 0 && (
          <p><strong>Rate:</strong> ${person.hourlyRate}/hr</p>
        )}
        
        <div className="member-metrics">
          {memberMetrics.map((metric, index) => (
            <span key={index}>{metric.label}: {metric.value}%</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizationResults;