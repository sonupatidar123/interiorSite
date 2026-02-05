import React, { useState } from 'react';
import { Quote, Send, MapPin, User } from "lucide-react";

export default function TestimonialPage() {
  // 1. Initial Data
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      location: "Mandsaur",
      feedback: "Lokesh transformed our home beautifully. Highly recommend Lucky Interior!",
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Indore",
      feedback: "The 3D visualization helped us see exactly what we were getting. Amazing!",
    }
  ]);

  // 2. Form State
  const [formData, setFormData] = useState({ name: '', location: '', feedback: '' });

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.feedback) return;

    const newEntry = {
      id: Date.now(), // Unique ID
      ...formData
    };

    setTestimonials([newEntry, ...testimonials]); // Add new one to the top
    setFormData({ name: '', location: '', feedback: '' }); // Reset form
    alert("Thank you! Your feedback has been added.");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* --- UPLOAD FORM --- */}
      <section className="mb-16 bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
          <Send className="w-5 h-5 text-primary" />
          Share Your Experience
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Your Name"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="City (e.g. Mandsaur)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Your Feedback</label>
            <textarea 
              placeholder="Tell us about your project..."
              rows="4"
              className="w-full p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit"
            className="md:col-span-2 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Post Testimonial
          </button>
        </form>
      </section>

      {/* --- TESTIMONIAL DISPLAY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <article key={t.id} className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <Quote className="h-6 w-6 text-primary/40 mb-3" />
            <p className="text-gray-700 mb-4 italic">"{t.feedback}"</p>
            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-900">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.location}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}