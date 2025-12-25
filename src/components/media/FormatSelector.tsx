import { useState } from "react";
import { Check, Video, Music, FileVideo, FileAudio, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaFormat } from "@/types/media";

type FormatSelectorProps = {
  formats: MediaFormat[];
  selectedFormat: MediaFormat | null;
  onSelectFormat: (format: MediaFormat) => void;
};

export const FormatSelector = ({
  formats,
  selectedFormat,
  onSelectFormat,
}: FormatSelectorProps) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'audio'>('all');

  // Separate video and audio formats
  const videoFormats = formats.filter(f => f.hasVideo);
  const audioFormats = formats.filter(f => !f.hasVideo && f.hasAudio);

  const filteredFormats = filter === 'all' 
    ? formats 
    : filter === 'video' 
      ? videoFormats 
      : audioFormats;

  // Sort by quality (higher resolution/bitrate first)
  const sortedFormats = [...filteredFormats].sort((a, b) => {
    // Parse resolution or bitrate for sorting
    const getQualityValue = (format: MediaFormat) => {
      if (format.resolution) {
        const height = parseInt(format.resolution.split('x')[1] || '0');
        return height;
      }
      if (format.bitrate) {
        return format.bitrate;
      }
      return 0;
    };
    return getQualityValue(b) - getQualityValue(a);
  });

  return (
    <div className="w-full space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Select Format</h3>
        <div className="flex gap-1 p-1 rounded-lg bg-secondary/50">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              filter === 'all' 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {videoFormats.length > 0 && (
            <button
              onClick={() => setFilter('video')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5",
                filter === 'video' 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Video className="w-3.5 h-3.5" />
              Video
            </button>
          )}
          {audioFormats.length > 0 && (
            <button
              onClick={() => setFilter('audio')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5",
                filter === 'audio' 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Music className="w-3.5 h-3.5" />
              Audio
            </button>
          )}
        </div>
      </div>

      {/* Format list */}
      <div className="grid gap-2">
        {sortedFormats.map((format) => {
          const isSelected = selectedFormat?.id === format.id;
          const FormatIcon = format.hasVideo ? FileVideo : FileAudio;

          return (
            <button
              key={format.id}
              onClick={() => onSelectFormat(format)}
              className={cn(
                "w-full p-4 rounded-xl text-left transition-all",
                "border-2",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    isSelected ? "bg-primary/20" : "bg-secondary"
                  )}>
                    <FormatIcon className={cn(
                      "w-5 h-5",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <span className="uppercase">{format.format}</span>
                      <span className="text-primary font-semibold">{format.quality}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      {format.resolution && <span>{format.resolution}</span>}
                      {format.codec && <span>• {format.codec}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {format.fileSizeFormatted}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {sortedFormats.length === 0 && (
        <div className="p-6 text-center rounded-xl bg-muted/50 border border-border/50">
          <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">
            No {filter === 'all' ? '' : filter} formats available
          </p>
        </div>
      )}
    </div>
  );
};
