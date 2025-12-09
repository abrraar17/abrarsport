import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { blogs } from "../data/blogs";
import { useEffect, useState } from "react";

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
    <div style={styles.container}>
      <p style={{ opacity: 0.7, marginBottom: "20px" }}>{blog.date}</p>

      <div style={styles.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  content: {
    marginTop: "30px",
    lineHeight: "1.7",
    fontSize: "18px",
  }
};

export default BlogDetail;

