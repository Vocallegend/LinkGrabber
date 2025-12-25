import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
      <div className="container max-w-6xl mx-auto">
        <nav className="flex items-center justify-between glass rounded-2xl px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[hsl(190_100%_40%)] flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">L</span>
            </div>
            <span className="font-semibold text-lg">LinkGrabber</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
          </div>

          <Button variant="glow" size="sm">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};
