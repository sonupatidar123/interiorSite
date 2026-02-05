import lokeshImg from "../assets/lokesh.jpg";
export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/30 py-20">
        <div className="container-narrow mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            About Lucky Interior
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting beautiful, functional spaces for homes and businesses 
            across Mandsaur, Indore & surrounding areas.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding py-16">
        <div className="container-narrow mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Founder Image Section */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                {/* TIP: Agar aapke paas apni photo hai, toh use 'public' folder mein dalo 
                  aur src="/lokesh-photo.jpg" likho. 
                  Abhi ke liye main ek professional designer image use kar raha hoon.
                */}
                <img
                  src={lokeshImg}
                  alt="Lokesh - Lucky Interior Founde"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-8 py-4 rounded-xl shadow-xl">
                  <span className="font-serif font-bold text-lg block leading-none">Lokesh</span>
                  <span className="text-xs opacity-80 uppercase tracking-widest">Lead Designer</span>
                </div>

                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6 leading-tight">
                Meet Lokesh – Your Personal <br />Interior Design Partner
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Hello! I'm <strong className="text-foreground">Lokesh</strong>, the founder 
                  of Lucky Interior. My mission is to bridge the gap between luxury and affordability
                  for the people of <strong className="text-foreground">Mandsaur</strong> and <strong className="text-foreground">Indore</strong>.
                </p>
                <p>
                  Whether it's a modern home in <strong className="text-foreground">Lalakheda</strong> 
                  or a commercial office in <strong className="text-foreground">Ranayara</strong>, 
                  I treat every project as a unique canvas.
                </p>
                <p className="italic border-l-4 border-primary/30 pl-4 bg-secondary/20 py-2">
                  "I don't just design rooms; I design the backdrop of your life's best memories."
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 pt-8 border-t border-border">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-serif font-bold text-primary">50+</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-tighter">Projects</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-serif font-bold text-primary">5+</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-tighter">Years Exp.</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-serif font-bold text-primary">100%</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-tighter">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Values Section */}
      <section className="section-padding bg-secondary/10 py-20">
        <div className="container-narrow mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground text-center mb-16">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Client-Focused",
                description: "Your vision drives every decision. We listen, understand, and deliver designs that truly reflect you.",
                color: "bg-blue-50"
              },
              {
                title: "Quality First",
                description: "From materials to craftsmanship, we never compromise on quality. Every detail matters.",
                color: "bg-amber-50"
              },
              {
                title: "Timely Delivery",
                description: "We respect your time. Projects in Indore and Mandsaur are completed on schedule, every time.",
                color: "bg-green-50"
              },
            ].map((value) => (
              <div key={value.title} className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}