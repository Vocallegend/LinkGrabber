import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Clock, Film, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaInfo } from "@/types/media";

type MediaPreviewProps = {
  media: MediaInfo;
};

export const MediaPreview = ({ media }: MediaPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const MediaTypeIcon = media.mediaType === 'audio' ? Music : Film;

  return (
    <div className="w-full rounded-2xl overflow-hidden glass animate-fade-up">
      {/* Thumbnail / Preview */}
      <div className="relative aspect-video bg-secondary/50">
        {media.thumbnail ? (
          <img
            src={media.thumbnail}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MediaTypeIcon className="w-16 h-16 text-muted-foreground" />
          </div>
        )}

        {/* Preview overlay */}
        {media.previewUrl && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full w-16 h-16"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-sm font-medium flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {media.durationFormatted}
        </div>

        {/* Media type badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium uppercase flex items-center gap-1.5">
          <MediaTypeIcon className="w-3.5 h-3.5" />
          {media.mediaType}
        </div>
      </div>

      {/* Preview controls (shown when preview is available) */}
      {media.previewUrl && isPlaying && (
        <div className="p-3 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 w-8"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">Preview only</span>
        </div>
      )}

      {/* Media info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{media.title}</h3>
        {media.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {media.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <span className="capitalize">{media.source}</span>
          {media.uploadDate && <span>{media.uploadDate}</span>}
          {media.viewCount && (
            <span>{media.viewCount.toLocaleString()} views</span>
          )}
        </div>
      </div>
    </div>
  );
};
