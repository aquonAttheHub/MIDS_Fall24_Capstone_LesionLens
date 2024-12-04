import React from 'react';
import '../Team.css';
import aryanaImage from '../images/aryana.jpg';
import induImage from '../images/indu1.png';
import ansonImage from '../images/anson.png';
import pranavImage from '../images/pranav.png';
import ashokImage from '../images/ashok.png';

const teamMembers = [
  {
    name: "Aryana Far",
    role: "Project Manager, Full-Stack Data Scientist",
    image: aryanaImage, // Replace with a real image URL or path
    linkedin: "https://www.linkedin.com/in/aryana-far/"
  },
  {
    name: "Pranav Viswanathan",
    role: "Deep Learning Lead, Full-Stack Data Scientist",
    image: pranavImage, // Replace with a real image URL or path
    linkedin: "https://www.linkedin.com/in/pranavvis/"
  },
  {
    name: "Indu Abhilash",
    role: "Infrastructure Lead, Full-Stack Developer",
    image: induImage, // Replace with a real image URL or path
    linkedin: "https://www.linkedin.com/in/indu-abhilash/"
  },
  {
    name: "Ashok Sundararaman",
    role: "Modeling Lead, Full-Stack Data Scientist",
    image: ashokImage, // Replace with a real image URL or path
    linkedin: "https://www.linkedin.com/in/ashoksundararaman/"
  },
  {
    name: "Anson Quon",
    role: "Infrastructure Lead, Full-Stack Developer",
    image: ansonImage, // Replace with a real image URL or path
    linkedin: "https://www.linkedin.com/in/anson-quon/"
  },
];

function Team() {
  return (
    <div className="team-page">
      <h1>Meet the Team</h1>
      <div className="top-row team-members">
        {teamMembers.slice(0, 3).map((member, index) => (
          <div className="team-member" key={index}>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <img src={member.image} alt={`${member.name}'s profile`} className="team-image" />
                <h2>{member.name}</h2>
            </a>
            <h3>
              {member.role.split(", ").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h3>
          </div>
        ))}
      </div>
      <div className="bottom-row">
        {teamMembers.slice(3).map((member, index) => (
          <div className="team-member" key={index}>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <img src={member.image} alt={`${member.name}'s profile`} className="team-image" />
                <h2>{member.name}</h2>
            </a>
            <h3>
              {member.role.split(", ").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;