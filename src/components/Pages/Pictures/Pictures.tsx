import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/photos/IMG_0054.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_0360.JPG", width: 4032, height: 3024 },
  { src: "/photos/IMG_0608.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_0706.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_0826.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_0995 2.JPG", width: 1440, height: 1920 },
  { src: "/photos/IMG_1041.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_2049.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_2108.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_2189.JPG", width: 1536, height: 2048 },
  { src: "/photos/IMG_2198.JPG", width: 1536, height: 2048 },
  { src: "/photos/IMG_2364.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_2437.webp", width: 3024, height: 4032 },
  { src: "/photos/IMG_2954.JPG", width: 2744, height: 3662 },
  { src: "/photos/IMG_1701.JPG", width: 3024, height: 4032 },
  { src: "/photos/IMG_2483.JPG", width: 3024, height: 4032 },
  { src: "/photos/IMG_0842.JPG", width: 3024, height: 4032 },
  { src: "/photos/IMG_2172.JPG", width: 1536, height: 2048 },
  { src: "/photos/IMG_2179.JPG", width: 1536, height: 2048 },
];

interface Props {
  showContent: boolean;
}

const LeftArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 z-[1000] rounded-lg bg-white p-2 shadow-md focus:outline-none lg:-left-10"
  >
    <ArrowLeftIcon height={16} width={16} fill="black" />
  </button>
);

const RightArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 z-[1000] rounded-lg bg-white p-2 shadow-md focus:outline-none lg:-right-10"
  >
    <ArrowRightIcon height={16} width={16} fill="black" />
  </button>
);

export const Pictures = ({ showContent }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heightAndWidth, setHeightAndWidth] = useState({ height: 0, width: 0 });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const ref = useRef<HTMLDivElement>(null);

  const updateDimensions = () => {
    if (ref.current) {
      setHeightAndWidth({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      });
    }
  };

  useEffect(() => {
    // Set initial dimensions
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [showContent]);

  return (
    <>
      <div
        ref={ref}
        className={clsx(
          "relative h-screen w-screen overflow-hidden bg-white/35 duration-1000 lg:h-full lg:w-full",
          {
            "fade-in": showContent,
            "fade-out": !showContent,
          },
        )}
      >
        <div
          className="absolute flex h-full w-full items-center bg-transparent transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * heightAndWidth.width * 2}px)`,
            width: `${photos.length * 100}%`,
            zIndex: 2,
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative flex-shrink-0"
              style={{
                height: heightAndWidth.height,
                width: heightAndWidth.width,
                marginRight: heightAndWidth.width,
              }}
            >
              <Image
                src={photo.src}
                alt={`Photo ${photo.src}`}
                layout="fill"
                className="o"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-2 z-50 flex w-screen items-center justify-center lg:-top-12 lg:w-full">
        <p className="items-center rounded-lg bg-white px-2 py-1 text-center font-helvetica text-xl text-black/60 shadow-md lg:bg-none">{`${currentIndex + 1} / ${photos.length}`}</p>
      </div>
      <LeftArrow onClick={handlePrev} />
      <RightArrow onClick={handleNext} />
    </>
  );
};
