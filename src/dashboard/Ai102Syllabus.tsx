import React from 'react';
import './Ai102Syllabus.scss';
import syllabus from './../data/ai102Syllabus.json';

const Ai102Syllabus = () => {
  const { exam } = syllabus;

  return (
    <div className="ai102-container">
      <h2>{exam.title}</h2>
      <p><strong>Exam Code:</strong> {exam.code}</p>
      <p><strong>Duration:</strong> {exam.duration}</p>
      <p><strong>Passing Score:</strong> {exam.passingScore}</p>
      <p><strong>Price:</strong> ${exam.priceUSD}</p>

      <h3>Skills Measured</h3>
      {exam.skillsMeasured.map((domain, idx) => (
        <div key={idx} className="domain-block">
          <h4>{domain.domain} ({domain.weight})</h4>
          <ul>
            {domain.topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Key Azure Services</h3>
      <p className="service-list">{exam.servicesCovered.join(', ')}</p>
      <a
        href="https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/?practice-assessment-type=certification"
        target="_blank"
        rel="noopener noreferrer"
      >
        More Details &#8599;
      </a>
    </div>
  );
};

export default Ai102Syllabus;
