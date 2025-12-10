import "../styles/projectcard.css";

function ProjectCard({ image, title, description, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />

      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>

      <a href={link} className="project-btn" target="_blank">
        View Project →
      </a>
    </div>
  );
}

export default ProjectCard;
