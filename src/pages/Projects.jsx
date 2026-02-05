import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Commercial"];
const DJANGO_API_URL = "https://interior-project01.onrender.com/api/projects/";

export default function Projects() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) setActiveCategory(urlCategory);
  }, [searchParams]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(DJANGO_API_URL);
        setProjects(res.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 🔹 SMART IMAGE HANDLER
  const formatImageURL = (path) => {
    if (!path) return "https://placehold.co/600x400?text=Lucky+Interior"; // Fallback if no path
    if (path.startsWith("http")) return path; // Already a full URL (Cloudinary)
    return `https://interior-project01.onrender.com${path}`; // Local path to Full URL
  };

  // 🔹 Category filter
  let filtered = activeCategory === "All"
    ? projects
    : projects.filter(
        (p) => (p.category || "").toLowerCase() === activeCategory.toLowerCase()
      );

  // 🔹 Search filter
  filtered = filtered.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow mx-auto text-center">
          <h1 className="text-4xl font-serif mb-4">Our Projects</h1>
          <p className="text-muted-foreground">Explore our interior design work</p>
        </div>
      </section>

      <section className="py-6">
        <div className="container-narrow mx-auto">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </section>

      <section className="py-6 border-b">
        <div className="container-narrow mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          {loading && <p className="text-center py-10">Loading masterpieces...</p>}
          {error && <p className="text-center text-red-500 py-10">{error}</p>}

          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No projects found in this category.</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
                onClick={() => setSelectedProject(p)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={formatImageURL(p.image)}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Project Detail */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={formatImageURL(selectedProject?.image)}
              alt={selectedProject?.title}
              className="w-full rounded-lg object-cover"
              onError={(e) => { e.target.src = "https://placehold.co/800x600?text=Error+Loading+Image"; }}
            />
            <div className="mt-6">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-2">
                {selectedProject?.category}
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}