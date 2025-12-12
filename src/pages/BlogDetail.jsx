import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { blogs } from "../data/blogs";
import { useEffect, useState } from "react";
import "../styles/blogdetail.css";
import "../styles/blogcard.css";


function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(blog.file)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [id]);

  return (
    <div className="blog-detail-container">
      <p className="blog-date">{blog.date}</p>

      <div className="blog-detail-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default BlogDetail;


