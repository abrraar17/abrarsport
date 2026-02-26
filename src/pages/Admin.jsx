// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AdminProjectForm from "../components/AdminProjectForm";
import AdminLinkForm from "../components/AdminLinkForm";
import AdminVisits from "../components/AdminVisits";
import "../styles/admin.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [session, setSession] = useState(null);
  const [projects, setProjects] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) =>
      setSession(data.session ?? null)
    );

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user?.email) verifyAdmin(session.user.email);
      }
    );

    fetchProjects();
    fetchLinks();

    return () => {
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/getProjects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchProjects error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchLinks() {
    try {
      const res = await fetch("/api/admin/getLinks");
      const data = await res.json();
      setLinks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchLinks error:", err);
      setLinks([]);
    }
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

      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => setActiveTab("projects")}>Projects</button>
          <button onClick={() => setActiveTab("links")}>Links</button>
          <button onClick={() => setActiveTab("visits")}>Visits</button>
        </div>
      )}

      <main>
        {activeTab === "projects" && (
          <>
            <section className="admin-actions">
              <h3>Create Project</h3>
              <AdminProjectForm onSuccess={fetchProjects} />
            </section>

            <section className="admin-list">
              <h3>Existing Projects</h3>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="projects-list">
                  {projects.map((p) => (
                    <div key={p.id} className="admin-project-card">
                      <img src={p.image_url} alt={p.title} />

                      <div>
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>

                        <div className="admin-actions-row">
                          <button onClick={() => setEditingProject(p)}>Edit</button>

                          <button
                            onClick={async () => {
                              const confirmed = confirm("Delete project?");
                              if (!confirmed) return;

                              await fetch("/api/admin/deleteProject", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: p.id }),
                              });

                              fetchProjects();
                            }}
                          >
                            Delete
                          </button>
                        </div>

                        {editingProject?.id === p.id && (
                          <AdminProjectForm
                            mode="edit"
                            initialData={editingProject}
                            onCancel={() => setEditingProject(null)}
                            onSuccess={() => {
                              setEditingProject(null);
                              fetchProjects();
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "links" && (
          <>
            <section className="admin-actions">
              <h3>Add Link</h3>
              <AdminLinkForm onSuccess={fetchLinks} />
            </section>

            <section className="admin-list">
              <h3>Existing Links</h3>
              <div className="projects-list">
                {links.map((l) => (
                  <div key={l.id} className="admin-project-card">
                    <img src={l.image_url} alt={l.title} style={{ width: "80px" }} />
                    <div>
                      <h4>{l.title}</h4>
                      <p>{l.description}</p>
                      <a href={l.url} target="_blank" rel="noopener noreferrer">{l.url}</a>

                      <div className="admin-actions-row">
                        <button onClick={() => setEditingLink(l)}>Edit</button>
                        <button
                          onClick={async () => {
                            if (!confirm("Delete this link?")) return;
                            await fetch("/api/admin/deleteLink", {
                              method: "DELETE",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ id: l.id }),
                            });
                            fetchLinks();
                          }}
                        >
                          Delete
                        </button>
                      </div>

                      {editingLink?.id === l.id && (
                        <AdminLinkForm
                          mode="edit"
                          initialData={editingLink}
                          onCancel={() => setEditingLink(null)}
                          onSuccess={() => {
                            setEditingLink(null);
                            fetchLinks();
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "visits" && <AdminVisits />}
      </main>
    </div>
  );
}



