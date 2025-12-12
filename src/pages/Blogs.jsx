import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";
import "../styles/blogs.css";
import "../styles/blogcard.css";

function Blogs() {
  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Blogs</h1>

      <div className="blogs-grid">
        {blogs.map((b, i) => (
          <div className="blog-card" key={i}>
            <BlogCard
              title={b.title}
              description={b.description}
              date={b.date}
              link={`/blogs/${b.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
