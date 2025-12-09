import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

function Projects() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Projects</h1>

      <div style={styles.grid}>
        {projects.map((proj, index) => (
          <ProjectCard
            key={index}
            image={proj.image}
            title={proj.title}
            description={proj.description}
            link={proj.link}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  }
};

export default Projects;
