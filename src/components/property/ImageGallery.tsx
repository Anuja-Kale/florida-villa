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
      {/* ✅ Responsive Gallery
          - Mobile: 1 big image + 2x2 grid underneath (nice and readable)
          - Desktop: your original 4x2 layout
      */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="grid gap-2 grid-cols-2 auto-rows-[120px] sm:grid-cols-4 sm:grid-rows-2 sm:auto-rows-[200px] sm:h-[420px]">
          {/* Main image */}
          <div
            className="relative cursor-pointer group col-span-2 row-span-2 sm:col-span-2 sm:row-span-2"
            onClick={() => openAt(0)}
          >
            <img
              src={displayImages[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
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
              aria-label="Like"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "fill-accent text-accent" : "text-muted-foreground"
                }`}
              />
            </Button>
          </div>

          {/* Other 4 images (2x2 on mobile, 2x2 on right for desktop) */}
          {displayImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer group overflow-hidden rounded-lg sm:rounded-none"
              onClick={() => openAt(index + 1)}
            >
              <img
                src={image}
                alt={`${title} - Image ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Last tile overlay */}
              {index === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center p-3 text-center">
                  <span className="text-white font-semibold text-sm sm:text-lg leading-snug">
                    View All {images.length} Images
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className={[
            "p-0 border-0 bg-transparent shadow-none",
            "w-screen h-screen max-w-none",
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
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Left Arrow */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center px-6 sm:px-10">
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
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
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