import { Link } from "react-router-dom";
import { ArrowRight, Home as HomeIcon, Sofa, UtensilsCrossed, Building2 } from "lucide-react";
import { Button } from "@/Components/ui/button";

const services = [
  {
    icon: HomeIcon,
    title: "Living Room Design",
    description: "Create stunning living spaces that reflect your personality.",
  },
  {
    icon: Sofa,
    title: "Bedroom Interiors",
    description: "Peaceful, comfortable bedrooms for restful nights.",
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchen Design",
    description: "Functional, beautiful kitchens for modern homes.",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Professional interiors for offices and retail.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
        <div className="container-narrow mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight mb-6 animate-fade-in-up">
              Lucky Interior – Interior Designer in Mandsaur & Indore
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Transform your home with Lokesh, your trusted near-home interior designer 
              serving Mandsaur, Indore, Lalakheda, and Ranayara. Premium designs that 
              blend beauty with functionality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              What We Create
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From cozy living rooms to elegant commercial spaces, we bring your vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-card p-6 rounded-lg border border-border card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <service.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/services">
                All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Let's discuss your project. Available for interior design projects in 
            Mandsaur, Indore, Lalakheda, and nearby areas.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
