import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Loader2, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { validateUrl, analyzeMedia, isBackendConnected } from "@/lib/api/media";
import type { MediaInfo, AnalysisError } from "@/types/media";

type MediaAnalyzerProps = {
  onAnalysisComplete: (media: MediaInfo) => void;
  onAnalysisStart: () => void;
  onReset: () => void;
};

export const MediaAnalyzer = ({ 
  onAnalysisComplete, 
  onAnalysisStart,
  onReset 
}: MediaAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AnalysisError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate URL
    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError({
        code: 'INVALID_URL',
        message: validation.error || 'Please enter a valid URL',
      });
      return;
    }

    setIsLoading(true);
    onAnalysisStart();

    try {
      const result = await analyzeMedia(url);

      if (result.success && result.data) {
        toast.success("Media analyzed successfully!");
        onAnalysisComplete(result.data);
      } else if (result.error) {
        setError(result.error);
        
        // Show user-friendly error message
        if (result.error.code === 'BACKEND_NOT_CONNECTED') {
          toast.error("Backend service not available", {
            description: "Media analysis requires backend infrastructure.",
          });
        } else {
          toast.error(result.error.message);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError({
        code: 'UNEXPECTED_ERROR',
        message: errorMessage,
      });
      toast.error("Analysis failed", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setError(null);
    onReset();
  };

  const backendConnected = isBackendConnected();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative flex flex-col sm:flex-row gap-3 p-2 rounded-2xl glass">
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Paste your media link here..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              className="pl-12 h-14 bg-secondary/30 border-0 text-base focus-visible:ring-1"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            {url && !isLoading && (
              <Button
                type="button"
                variant="ghost"
                size="xl"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
            <Button 
              type="submit" 
              variant="hero" 
              size="xl"
              disabled={isLoading || !url.trim()}
              className="sm:w-auto w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Link
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Error display */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">{error.message}</p>
              {error.details && (
                <p className="text-sm text-muted-foreground mt-1">{error.details}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backend status indicator */}
      {!backendConnected && !error && (
        <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Backend Setup Required</p>
              <p className="text-sm text-muted-foreground mt-1">
                Media analysis and download features require a backend service. 
                The UI is production-ready and will work once the backend is connected.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
