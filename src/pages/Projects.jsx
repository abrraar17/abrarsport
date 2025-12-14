import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/getProjects")
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

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

