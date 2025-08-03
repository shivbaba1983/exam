import React from 'react';
import './AwsDeveloperCert.scss';
import data from './awsDVAData.json';

const AwsDeveloperCert = () => {
  const exam = data.exam;

  return (
    <div className="aws-cert">
      <h2>{exam.title}</h2>

      <h3>Exam Overview</h3>
      <ul>
        <li><strong>Exam Code:</strong> {exam.overview.code}</li>
        <li><strong>Level:</strong> {exam.overview.level}</li>
        <li><strong>Duration:</strong> {exam.overview.duration}</li>
        <li><strong>Format:</strong> {exam.overview.format}</li>
        <li><strong>Cost:</strong> {exam.overview.cost}</li>
        <li><strong>Delivery Method:</strong> {exam.overview.delivery}</li>
      </ul>

      <h3>Domains & Weightage</h3>
      {exam.domains.map((domain, index) => (
        <div className="domain-block" key={index}>
          <h4>{domain.title} – {domain.weight}</h4>
          <ul>
            {domain.topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Recommended AWS Services to Know</h3>
      <p className="services-list">{exam.recommendedServices.join(', ')}</p>
    </div>
  );
};

export default AwsDeveloperCert;
