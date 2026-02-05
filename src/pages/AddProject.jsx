import { useEffect, useState } from "react";
import { api } from "../api";
import "./AddProject.css";
import { Link } from "react-router-dom";

export default function AddProject() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  // 1. Check if User is Admin
  const fetchUser = async () => {
    try {
      const res = await api.get("me/"); 
      if (res.data.is_superuser) {
        setAuthorized(true);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setAuthorized(false);
    }
  };

  // 2. Fetch Projects List
  const fetchProjects = async () => {
    try {
      const res = await api.get("projects/");
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (authorized) fetchProjects();
  }, [authorized]);

  // 3. Handle Form Submit (Add or Update)
  const submit = async (e) => {
    e.preventDefault();
    if (!authorized) return alert("Unauthorized access!");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await api.put(`projects/${editId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project updated successfully! ✅");
      } else {
        await api.post("projects/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("New project added! 🚀");
      }
      
      // Reset Form
      setTitle("");
      setDescription("");
      setImage(null);
      setEditId(null);
      e.target.reset(); // File input clear karne ke liye
      fetchProjects();
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to save project. Check Cloudinary/Backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const editProject = (project) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditId(project.id);
    setTitle(project.title);
    setDescription(project.description);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await api.delete(`projects/${id}/`);
      fetchProjects();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (!authorized) {
    return (
      <div className="unauthorized">
        <p>Aapko is page ka access nahi hai. Please Admin account se login karein.</p>
        <Link to="/login">Login Page</Link>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Admin Navigation */}
      <div className="admin-nav">
        <h2>Lucky Interior Admin</h2>
        <Link to="/admin-messages" className="msg-btn">
          Inquiry Messages ✉️
        </Link>
      </div>

      {/* Form Section */}
      <div className="form-card">
        <h3>{editId ? "✏️ Edit Project" : "➕ Add New Project"}</h3>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="file-input">
            <label>Upload Project Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : editId ? "Update Now" : "Upload Project"}
          </button>
          {editId && <button onClick={() => setEditId(null)} className="cancel-btn">Cancel Edit</button>}
        </form>
      </div>

      {/* Projects Display List */}
      <div className="list-card">
        <h3>Live Projects on Website</h3>
        <div className="admin-project-grid">
          {projects.map((p) => (
            <div key={p.id} className="admin-project-item">
              <div className="img-wrapper">
             {p.image && (
  <img 
    src={p.image.startsWith('http') ? p.image : `https://interior-project01.onrender.com${p.image}`} 
    alt={p.title} 
    className="project-image"
    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
  />
)}
              </div>
              <div className="info">
                <h4>{p.title}</h4>
                <p>{p.description.substring(0, 60)}...</p>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => editProject(p)}>Edit</button>
                  <button className="del-btn" onClick={() => deleteProject(p.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}