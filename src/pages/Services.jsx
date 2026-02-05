import { Link } from "react-router-dom";
import { Palette, Box, Hammer, Key, ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";

const services = [
  {
    icon: Palette,
    title: "Interior Design",
    description: "Complete interior design services for homes and offices. We create personalized spaces that reflect your style and meet your functional needs.",
    features: [
      "Space planning & layout design",
      "Color scheme & material selection",
      "Furniture & decor recommendations",
      "Lighting design",
    ],
  },
  {
    icon: Box,
    title: "3D Visualization",
    description: "See your dream space before construction begins. Our photorealistic 3D renders help you visualize the final outcome.",
    features: [
      "Photorealistic 3D renders",
      "Virtual walkthroughs",
      "Design revisions",
      "Material visualization",
    ],
  },
  {
    icon: Hammer,
    title: "Renovation",
    description: "Transform your existing space with our renovation services. We breathe new life into outdated interiors.",
    features: [
      "Kitchen & bathroom remodeling",
      "Living space transformation",
      "Structural modifications",
      "Modern upgrades",
    ],
  },
  {
    icon: Key,
    title: "Turnkey Projects",
    description: "End-to-end interior solutions from concept to completion. We handle everything so you can move in hassle-free.",
    features: [
      "Design to execution",
      "Project management",
      "Quality assurance",
      "Timely delivery",
    ],
  },
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive interior design services available in Mandsaur, Indore, 
            Lalakheda, Ranayara & surrounding areas.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <article
                key={service.title}
                className="bg-card border border-border rounded-xl p-8 card-hover"
              >
                <service.icon className="h-12 w-12 text-primary mb-6" />
                
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {service.title}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
            Areas We Serve
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            As your trusted interior designer, Lucky Interior provides services across:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {["Mandsaur", "Indore", "Lalakheda", "Ranayara", "Nearby Areas"].map((area) => (
              <span
                key={area}
                className="px-6 py-3 bg-background border border-border rounded-full text-foreground font-medium"
              >
                {area}
              </span>
            ))}
          </div>

          <Button asChild size="lg">
            <Link to="/contact">
              Get a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
