import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";

function Blogs() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blogs</h1>

      <div style={styles.grid}>
        {blogs.map((b, i) => (
          <BlogCard
            key={i}
            title={b.title}
            description={b.description}
            date={b.date}
            link={`/blogs/${b.id}`}
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

export default Blogs;
