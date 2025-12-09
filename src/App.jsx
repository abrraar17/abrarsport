import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Links from "./pages/Links";


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/blogs/:id" element={<BlogDetail />} />
  <Route path="/links" element={<Links />} />
</Routes>
    </div>
  );
}

export default App;

