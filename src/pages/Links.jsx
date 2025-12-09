import LinkCard from "../components/LinkCard";
import { links } from "../data/links";

function Links() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recommended Links</h1>

      <div style={styles.grid}>
        {links.map((item, i) => (
          <LinkCard
            key={i}
            image={item.image}
            title={item.title}
            description={item.description}
            url={item.url}
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

export default Links;
