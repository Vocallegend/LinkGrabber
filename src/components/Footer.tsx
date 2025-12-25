export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="gradient-text font-bold text-xl">G</span>
            </div>
            <div>
              <span className="font-semibold">LinkGrabber</span>
              <span className="text-muted-foreground text-sm block">by Gfly Studios</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm text-center md:text-left">
            Built for Speed. Designed with Responsibility.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gfly Studios. All rights reserved.</p>
          <p className="mt-2 text-xs">
            LinkGrabber only supports publicly accessible media. Users are responsible for ensuring they have rights to download content.
          </p>
        </div>
      </div>
    </footer>
  );
};
