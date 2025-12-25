import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaPreview } from "./MediaPreview";
import { FormatSelector } from "./FormatSelector";
import { DownloadPanel } from "./DownloadPanel";
import type { MediaInfo, MediaFormat } from "@/types/media";

type MediaResultsProps = {
  media: MediaInfo;
  onBack: () => void;
};

export const MediaResults = ({ media, onBack }: MediaResultsProps) => {
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Analyze Another Link
      </Button>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column: Preview */}
        <div>
          <MediaPreview media={media} />
        </div>

        {/* Right column: Format selection & Download */}
        <div className="space-y-6">
          <FormatSelector
            formats={media.formats}
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
          />
          
          <DownloadPanel
            media={media}
            selectedFormat={selectedFormat}
          />
        </div>
      </div>
    </div>
  );
};
