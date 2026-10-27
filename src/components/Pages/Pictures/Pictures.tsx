import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const existingPhotos = [
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

const filmPhotos = [
  { src: "/photos/19A_0875.jpg", width: 3000, height: 2000, alt: "Riverside buildings with mountains in the distance" },
  { src: "/photos/24A_0947.jpg", width: 3000, height: 2000, alt: "City skyline illuminated at night" },
  { src: "/photos/28A_0882.jpg", width: 3000, height: 2000, alt: "Film photograph 3 from Daniel's travel collection" },
  { src: "/photos/33A_0956.jpg", width: 3000, height: 2000, alt: "Film photograph 4 from Daniel's travel collection" },
  { src: "/photos/34A_0957.jpg", width: 3000, height: 2000, alt: "Film photograph 5 from Daniel's travel collection" },
  { src: "/photos/_19_0907.jpg", width: 3000, height: 2000, alt: "Film photograph 6 from Daniel's travel collection" },
  { src: "/photos/_22_0910.jpg", width: 3000, height: 2000, alt: "Film photograph 7 from Daniel's travel collection" },
  { src: "/photos/_26_0914.jpg", width: 3000, height: 2000, alt: "Film photograph 8 from Daniel's travel collection" },
  { src: "/photos/_8A_0867.jpg", width: 3000, height: 2000, alt: "Film photograph 9 from Daniel's travel collection" },
  { src: "/photos/__4_0892.jpg", width: 3000, height: 2000, alt: "Film photograph 10 from Daniel's travel collection" },
];

// Weave the new film photographs between the existing pictures.
const photos = existingPhotos.flatMap((photo, index) => {
  const filmPhoto = index % 2 === 0 ? filmPhotos[Math.floor(index / 2)] : undefined;
  return filmPhoto ? [photo, filmPhoto] : [photo];
});

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
    aria-label="Previous photo"
    className={clsx(
      "absolute left-4 top-1/2 rounded-lg bg-white/10 p-2 shadow-md backdrop-blur-3xl transition-all duration-150 hover:scale-110 focus:outline-none ",
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
    aria-label="Next photo"
    className={clsx(
      "absolute right-4 top-1/2 rounded-lg bg-white/10 p-2 shadow-md backdrop-blur-3xl transition-all duration-150 hover:scale-110 focus:outline-none ",
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

return (
    <>
      <div
        className={clsx(
          "relative h-full w-full overflow-hidden bg-white/35 duration-1000 lg:h-full lg:w-full",
          {
            "fade-in": showContent,
            "fade-out": !showContent,
          },
        )}
      >
        <div
          className="absolute flex h-full w-full items-center bg-transparent transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            zIndex: 2,
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={photo.src}
                alt={"alt" in photo ? String(photo.alt) : `Travel photograph ${photos.indexOf(photo) + 1} from Daniel's collection`}
                fill
                loading={photos.indexOf(photo) === currentIndex ? "eager" : "lazy"}
                sizes="(max-width: 767px) 100vw, 640px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "absolute top-2 flex w-full items-center justify-center lg:top-4 lg:w-full",
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
