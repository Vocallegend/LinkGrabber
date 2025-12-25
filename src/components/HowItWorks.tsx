import { ClipboardPaste, Search, Download } from "lucide-react";

const steps = [
  {
    icon: ClipboardPaste,
    step: "01",
    title: "Paste Your Link",
    description: "Copy any public media URL and paste it into LinkGrabber.",
  },
  {
    icon: Search,
    step: "02",
    title: "Analyze & Choose",
    description: "We'll instantly analyze available formats and quality options.",
  },
  {
    icon: Download,
    step: "03",
    title: "Download",
    description: "Select your preferred format and download your media.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-30" />
      
      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three Simple Steps
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            No accounts. No clutter. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
