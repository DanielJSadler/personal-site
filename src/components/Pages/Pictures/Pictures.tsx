import clsx from "clsx";
import Image from "next/image";
import {
  MasonryPhotoAlbum,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import "react-photo-album/masonry.css";

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

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}
interface Props {
  showContent: boolean;
}
export const Pictures = ({ showContent }: Props) => {
  return (
    <div className="cube__face cube__face--back">
      <div
        className={clsx("h-full w-full bg-white/35", {
          "fade-in": showContent,
          "fade-out": !showContent,
        })}
      >
        <div className="pictures-container h-full w-full pb-[250px] pt-[50px] lg:pb-[100px] lg:pt-[100px]">
          <p className="font-helvetica pb-4 text-xl text-black">
            {`Some pictures of me doing the things I love!`.toUpperCase()}
          </p>
          <div className="pictures-section">
            <MasonryPhotoAlbum
              photos={photos}
              render={{ image: renderNextImage }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
