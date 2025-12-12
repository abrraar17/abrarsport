// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AdminProjectForm from "../components/AdminProjectForm";
import "../styles/admin.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);



export default function Admin() {
  const [session, setSession] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // initialize session
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) verifyAdmin(session.user.email);
    });

    fetchProjects();

    return () => {
      // unsubscribe listener
      if (listener && listener.subscription) listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch("/api/admin/getProjects");
    const data = await res.json();
    setProjects(data || []);
    setLoading(false);
  }

  async function signIn() {
    const email = prompt("Admin email:");
    if (!email) return;
    await supabase.auth.signInWithOtp({ email });
    alert("Magic link sent. Check your email.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }

  async function verifyAdmin(email) {
    try {
      const res = await fetch("/api/admin/checkAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      setIsAdmin(!!json.isAdmin);
      if (!json.isAdmin) {
        alert("Your email is not an admin.");
        await supabase.auth.signOut();
        setSession(null);
      }
    } catch (err) {
      console.error("verifyAdmin error:", err);
      setIsAdmin(false);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h2>Admin Panel</h2>
        {!session ? (
          <button onClick={signIn}>Sign in (magic link)</button>
        ) : (
          <div>
            <span>{session.user.email}</span>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </header>

      <main>
        <section className="admin-actions">
          <h3>Projects</h3>
          {isAdmin ? <AdminProjectForm onSuccess={fetchProjects} /> : <p>Sign in as admin to manage projects.</p>}
        </section>

        <section className="admin-list">
          <h3>Existing Projects</h3>
          {loading ? <p>Loading...</p> : (
            <div className="projects-list">
              {projects.map(p => (
                <div key={p.id} className="admin-project-card">
                  <img src={p.image_url} alt={p.title} />
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                    <div className="admin-actions-row">
                      <button onClick={async () => {
                        const confirmed = confirm("Delete project?");
                        if (!confirmed) return;
                        await fetch("/api/admin/deleteProject", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: p.id })
                        });
                        fetchProjects();
                      }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
