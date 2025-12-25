import { useState } from "react";
import { Download, Loader2, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { prepareDownload, isBackendConnected } from "@/lib/api/media";
import type { MediaInfo, MediaFormat, DownloadProgress } from "@/types/media";

type DownloadPanelProps = {
  media: MediaInfo;
  selectedFormat: MediaFormat | null;
};

export const DownloadPanel = ({ media, selectedFormat }: DownloadPanelProps) => {
  const [downloadState, setDownloadState] = useState<DownloadProgress>({
    status: 'preparing',
    progress: 0,
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!selectedFormat) {
      toast.error("Please select a format first");
      return;
    }

    if (!isBackendConnected()) {
      toast.error("Download service not available", {
        description: "Backend infrastructure is required for downloads.",
      });
      return;
    }

    setIsDownloading(true);
    setDownloadState({ status: 'preparing', progress: 0, message: 'Preparing download...' });

    try {
      // Request download preparation from backend
      const result = await prepareDownload({
        mediaId: media.id,
        formatId: selectedFormat.id,
      });

      if (result.success && result.downloadUrl) {
        setDownloadState({ status: 'ready', progress: 100, message: 'Download ready!' });
        
        // Trigger browser download
        const link = document.createElement('a');
        link.href = result.downloadUrl;
        link.download = `${media.title}.${selectedFormat.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Download started!", {
          description: `${media.title} - ${selectedFormat.quality}`,
        });
      } else {
        setDownloadState({ 
          status: 'failed', 
          progress: 0, 
          message: result.error?.message || 'Download failed' 
        });
        toast.error("Download failed", {
          description: result.error?.message,
        });
      }
    } catch (error) {
      setDownloadState({ 
        status: 'failed', 
        progress: 0, 
        message: 'An unexpected error occurred' 
      });
      toast.error("Download failed", {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const backendConnected = isBackendConnected();

  return (
    <div className="w-full space-y-4 animate-fade-up">
      {/* Download summary */}
      {selectedFormat && (
        <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-3">
          <h4 className="font-medium">Download Summary</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Format:</span>
              <span className="ml-2 font-medium uppercase">{selectedFormat.format}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Quality:</span>
              <span className="ml-2 font-medium">{selectedFormat.quality}</span>
            </div>
            {selectedFormat.resolution && (
              <div>
                <span className="text-muted-foreground">Resolution:</span>
                <span className="ml-2 font-medium">{selectedFormat.resolution}</span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Size:</span>
              <span className="ml-2 font-medium">{selectedFormat.fileSizeFormatted}</span>
            </div>
          </div>
        </div>
      )}

      {/* Download button */}
      <Button
        variant="hero"
        size="xl"
        className="w-full"
        disabled={!selectedFormat || isDownloading || !backendConnected}
        onClick={handleDownload}
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {downloadState.message || 'Processing...'}
          </>
        ) : downloadState.status === 'ready' ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Download Complete
          </>
        ) : downloadState.status === 'failed' ? (
          <>
            <AlertCircle className="w-5 h-5" />
            Retry Download
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download {selectedFormat ? selectedFormat.quality : 'Media'}
          </>
        )}
      </Button>

      {/* Backend status */}
      {!backendConnected && (
        <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Downloads require backend service connection</span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Shield className="w-4 h-4 text-primary" />
          Responsible Use
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          By downloading, you confirm that you have the right to access and use this content. 
          LinkGrabber only supports publicly accessible media and does not bypass any 
          access restrictions, paywalls, or DRM protection.
        </p>
      </div>
    </div>
  );
};
