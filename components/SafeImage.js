import Image from "next/image";
import { useState } from "react";
import fallbackImg from "../public/spotify_fallback.jpg";

const SafeImage = ({ src, fallbackSrc = fallbackImg, alt, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src ? src : fallbackImg);

  return (
    <Image
      alt={alt}
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default SafeImage;
