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
  { src: "/photos/IMG_1701.jpg", width: 3024, height: 4032 },
  { src: "/photos/IMG_2483.jpg", width: 3024, height: 4032 },
  { src: "/photos/IMG_0842.jpg", width: 3024, height: 4032 },
  { src: "/photos/IMG_2172.JPG", width: 1536, height: 2048 },
  { src: "/photos/IMG_2179.JPG", width: 1536, height: 2048 },
];

interface Props {
  showContent: boolean;
}

const LeftArrow = ({
  onClick,
  showContent,
}: {
  onClick: () => void;
  showContent: boolean;
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "absolute left-4 top-1/2 rounded-lg bg-white/10 p-2 shadow-md backdrop-blur-3xl transition-all duration-150 hover:scale-110 focus:outline-none lg:-left-10",
      {
        "fade-in z-[1000]": showContent,
        "fade-out": !showContent,
      },
    )}
  >
    <ArrowLeftIcon height={16} width={16} fill="black" />
  </button>
);

const RightArrow = ({
  onClick,
  showContent,
}: {
  onClick: () => void;
  showContent: boolean;
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "absolute right-4 top-1/2 rounded-lg bg-white/10 p-2 shadow-md backdrop-blur-3xl transition-all duration-150 hover:scale-110 focus:outline-none lg:-right-10",
      {
        "fade-in z-[1000]": showContent,
        "fade-out": !showContent,
      },
    )}
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
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

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
      <div
        className={clsx(
          "absolute top-2 flex w-screen items-center justify-center lg:-top-12 lg:w-full",
          {
            "fade-in z-[1000]": showContent,
            "fade-out": !showContent,
          },
        )}
      >
        <p className="items-center rounded-lg bg-white/10 px-2 py-1 text-center text-xl text-black/60 shadow-md backdrop-blur-3xl">{`${currentIndex + 1} / ${photos.length}`}</p>
      </div>
      <LeftArrow onClick={handlePrev} showContent={showContent} />
      <RightArrow onClick={handleNext} showContent={showContent} />
    </>
  );
};
