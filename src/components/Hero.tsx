import { useState } from "react";
import { MediaAnalyzer } from "@/components/media/MediaAnalyzer";
import { MediaResults } from "@/components/media/MediaResults";
import type { MediaInfo } from "@/types/media";

export const Hero = () => {
  const [mediaResult, setMediaResult] = useState<MediaInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (media: MediaInfo) => {
    setMediaResult(media);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setMediaResult(null);
    setIsAnalyzing(false);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        {!mediaResult ? (
          /* Initial state: Link input */
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Powered by Gfly Studios</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-up leading-tight">
              <span className="gradient-text drop-shadow-lg">Smart Media Fetching.</span>
              <br />
              <span className="text-foreground drop-shadow-sm">Simple. Fast. Responsible.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up-delay-1 leading-relaxed">
              Fetch and download publicly accessible media content from supported platforms. 
              Just paste a link and get results.
            </p>

            {/* Media analyzer */}
            <div className="animate-fade-up-delay-2">
              <MediaAnalyzer
                onAnalysisComplete={handleAnalysisComplete}
                onAnalysisStart={() => setIsAnalyzing(true)}
                onReset={handleReset}
              />
            </div>

            {/* Trust indicators */}
            {!isAnalyzing && (
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground animate-fade-up-delay-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  No sign-up required
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Multiple formats
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Compliance-first
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results state: Media preview and download */
          <MediaResults media={mediaResult} onBack={handleReset} />
        )}
      </div>
    </section>
  );
};
