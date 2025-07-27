import React, { useState } from 'react';

const ProjectRequirements = ({ onUpdate, requirements }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    teamSize: '',
    requiredSkills: '',
    projectType: '',
    priority: '',
    timeline: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    
    const processedData = {
      ...updatedData,
      skills: updatedData.requiredSkills.split(',').map(s => s.trim()).filter(s => s),
      teamSize: parseInt(updatedData.teamSize) || 0
    };
    
    onUpdate(processedData);
  };

  return (
    <div className="card">
      <h2>Project Requirements</h2>
      <form className="requirements-form">
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="teamSize">Team Size</label>
            <select
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              required
            >
              <option value="">Select size</option>
              <option value="3">3 members</option>
              <option value="4">4 members</option>
              <option value="5">5 members</option>
              <option value="6">6 members</option>
              <option value="7">7 members</option>
              <option value="8">8 members</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="projectType">Project Type</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile Application</option>
              <option value="data-science">Data Science</option>
              <option value="ai-ml">AI/Machine Learning</option>
              <option value="enterprise">Enterprise Software</option>
              <option value="devops">DevOps/Infrastructure</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="requiredSkills">Required Skills (comma-separated)</label>
          <textarea
            id="requiredSkills"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            rows="3"
            placeholder="JavaScript, Python, React, Node.js, Database Design, AWS"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority Level</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select priority</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="critical">Critical Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeline">Timeline (months)</label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
            >
              <option value="">Select timeline</option>
              <option value="1">1 month</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18+ months</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectRequirements;