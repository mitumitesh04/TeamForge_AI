// components/PersonnelPool.js - Updated with MBTI Support
import React, { useState } from 'react';

const PersonnelPool = ({ personnel, onAddPerson, onRemovePerson, mbtiEnabled = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    experience: '',
    personality: '',
    mbtiType: '',
    availability: '',
    hourlyRate: ''
  });

  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.skills || !formData.experience || !formData.personality) {
      alert('Please complete all required fields');
      return;
    }

    const person = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      experienceYears: getExperienceYears(formData.experience),
      hourlyRate: parseFloat(formData.hourlyRate) || 0,
      mbtiType: formData.mbtiType || null
    };

    onAddPerson(person);
    setFormData({
      name: '',
      skills: '',
      experience: '',
      personality: '',
      mbtiType: '',
      availability: '',
      hourlyRate: ''
    });
  };

  const getExperienceYears = (level) => {
    const mapping = {
      'junior': Math.floor(Math.random() * 3) + 1,
      'mid': Math.floor(Math.random() * 3) + 3,
      'senior': Math.floor(Math.random() * 5) + 6,
      'lead': Math.floor(Math.random() * 5) + 10
    };
    return mapping[level] || 1;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getMBTIDescription = (mbtiType) => {
    const descriptions = {
      'INTJ': 'Architect - Strategic thinker',
      'INTP': 'Thinker - Innovative problem solver',
      'ENTJ': 'Commander - Natural leader',
      'ENTP': 'Debater - Creative innovator',
      'INFJ': 'Advocate - Insightful idealist',
      'INFP': 'Mediator - Creative helper',
      'ENFJ': 'Protagonist - Inspiring leader',
      'ENFP': 'Campaigner - Enthusiastic collaborator',
      'ISTJ': 'Logistician - Reliable organizer',
      'ISFJ': 'Protector - Caring supporter',
      'ESTJ': 'Executive - Efficient organizer',
      'ESFJ': 'Consul - Helpful collaborator',
      'ISTP': 'Virtuoso - Practical problem solver',
      'ISFP': 'Adventurer - Flexible artist',
      'ESTP': 'Entrepreneur - Energetic improviser',
      'ESFP': 'Entertainer - Spontaneous performer'
    };
    return descriptions[mbtiType] || '';
  };

  return (
    <div className="card">
      <h2>Personnel Pool {mbtiEnabled && <span className="mbti-badge">MBTI Enabled</span>}</h2>
      
      <form onSubmit={handleSubmit} className="personnel-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter person's full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Technical Skills (comma-separated) *</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="JavaScript, React, Node.js, Python"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="experience">Experience Level *</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="">Select experience</option>
              <option value="junior">Junior (0-2 years)</option>
              <option value="mid">Mid-level (3-5 years)</option>
              <option value="senior">Senior (6-10 years)</option>
              <option value="lead">Lead (10+ years)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="personality">Personality Type *</label>
            <select
              id="personality"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              required
            >
              <option value="">Select personality</option>
              <option value="analytical">Analytical</option>
              <option value="creative">Creative</option>
              <option value="leadership">Leadership</option>
              <option value="collaborative">Collaborative</option>
              <option value="detail-oriented">Detail-oriented</option>
              <option value="innovative">Innovative</option>
            </select>
          </div>
        </div>

        {mbtiEnabled && (
          <div className="form-group">
            <label htmlFor="mbtiType">MBTI Personality Type</label>
            <select
              id="mbtiType"
              name="mbtiType"
              value={formData.mbtiType}
              onChange={handleChange}
            >
              <option value="">Select MBTI Type (Optional)</option>
              {mbtiTypes.map(type => (
                <option key={type} value={type}>
                  {type} - {getMBTIDescription(type)}
                </option>
              ))}
            </select>
            {formData.mbtiType && (
              <small className="mbti-help">
                Selected: {formData.mbtiType} - {getMBTIDescription(formData.mbtiType)}
              </small>
            )}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="">Select availability</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hourlyRate">Hourly Rate (USD)</label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-secondary">
          Add Person
        </button>
      </form>

      <div className="personnel-list">
        {personnel.length === 0 ? (
          <div className="empty-state">No personnel added yet</div>
        ) : (
          personnel.map(person => (
            <div key={person.id} className="person-card">
              <div className="person-header">
                <h4>
                  {person.name}
                  {person.mbtiType && <span className="mbti-type">{person.mbtiType}</span>}
                </h4>
                <button 
                  className="btn-remove"
                  onClick={() => onRemovePerson(person.id)}
                  title="Remove person"
                  type="button"
                >
                  ×
                </button>
              </div>
              <div className="person-details">
                <p><strong>Skills:</strong> {person.skills.join(', ')}</p>
                <p><strong>Experience:</strong> {person.experience} ({person.experienceYears} years)</p>
                <p><strong>Personality:</strong> {person.personality}</p>
                {person.mbtiType && (
                  <p><strong>MBTI:</strong> {person.mbtiType} - {getMBTIDescription(person.mbtiType)}</p>
                )}
                {person.availability && <p><strong>Availability:</strong> {person.availability}</p>}
                {person.hourlyRate > 0 && <p><strong>Rate:</strong> ${person.hourlyRate}/hr</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonnelPool;