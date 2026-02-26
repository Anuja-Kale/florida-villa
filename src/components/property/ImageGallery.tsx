import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const displayImages = images.slice(0, 5);
  const remainingCount = Math.max(images.length - 5, 0);

  const openAt = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-xl overflow-hidden">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => openAt(0)}
        >
          <img
            src={displayImages[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 rounded-full bg-white/90 hover:bg-white shadow-soft"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked((v) => !v);
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>

        {/* Secondary images grid */}
        {displayImages.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => openAt(index + 1)}
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 2}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {index === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  View All {images.length} Images
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className={[
            "p-0 border-0 bg-transparent shadow-none",
            "w-screen h-screen max-w-none",
            // Hide the default shadcn DialogContent close button (it is rendered after children)
            "[&>button:last-child]:hidden",
          ].join(" ")}
        >
          <div className="relative w-full h-full bg-black/90 flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Left Arrow */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center px-10">
              <img
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                className="max-h-[88vh] max-w-[92vw] object-contain"
              />
            </div>

            {/* Right Arrow */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
