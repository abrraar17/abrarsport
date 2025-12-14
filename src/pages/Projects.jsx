import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/getProjects")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjects(data);
        else setProjects([]);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Projects</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Projects</h1>

      <div style={styles.grid}>
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            image={proj.image_url}
            title={proj.title}
            description={proj.description}
            link={proj.live_url}
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
  },
};

export default Projects;

