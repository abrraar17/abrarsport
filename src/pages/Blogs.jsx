import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";
import "../styles/blogs.css";

function Blogs() {
  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Blogs</h1>

      <div className="blog-card">
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

export default Blogs;

