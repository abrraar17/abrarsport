import { Link } from "react-router-dom";
import "../styles/blogcard.css";

function BlogCard({ title, description, date, link }) {
  return (
    <Link to={link} className="blog-card">
      <h3 className="blog-title">{title}</h3>
      <p className="blog-desc">{description}</p>
      <span className="blog-date">{date}</span>
    </Link>
  );
}

export default BlogCard;

