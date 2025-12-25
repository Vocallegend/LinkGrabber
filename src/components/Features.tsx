import { Link, Download, Zap, Shield, Smartphone, Sparkles } from "lucide-react";

const features = [
  {
    icon: Link,
    title: "Link-Based Fetching",
    description: "Simply paste any public media URL and let LinkGrabber handle the rest.",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download video or extract audio in various quality options when available.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized processing engine for quick analysis and preparation.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Clean, responsive interface that works perfectly on any device.",
  },
  {
    icon: Sparkles,
    title: "Modern UI",
    description: "Minimal, beautiful design focused on clarity and ease of use.",
  },
  {
    icon: Shield,
    title: "Compliance-First",
    description: "Built with strict safeguards for responsible content access.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Powerful media fetching capabilities wrapped in a simple, intuitive interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 animate-fade-up-delay-${Math.min(index % 3 + 1, 3)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
