const shimmer = (w: number, h: number, brigtnessTop: number, brigtnessBottom: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient
        gradientTransform="rotate(133, 0.5, 0.5)"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        id="ffflux-gradient"
      >
        <stop
          stop-color="hsl(0, 0%, ${brigtnessTop}%)"
          stop-opacity="1"
          offset="0%"
        ></stop>
        <stop
          stop-color="hsl(0, 0%, ${brigtnessBottom}%)"
          stop-opacity="1"
          offset="100%"
        ></stop>
      </linearGradient>
      <filter
        id="ffflux-filter"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.005 0.003"
          numOctaves="2"
          seed="197"
          stitchTiles="stitch"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="turbulence"
        ></feTurbulence>
        <feGaussianBlur
          stdDeviation="20 0"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="turbulence"
          edgeMode="duplicate"
          result="blur"
        ></feGaussianBlur>
        <feBlend
          mode="color-burn"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="SourceGraphic"
          in2="blur"
          result="blend"
        ></feBlend>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"  />
  </svg>
`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * A function that creates a shimmer effect based on an SVG generated using FFFlux Background. 
 * It takes parameters for width, height, upper threshold, and lower threshold of brightness. 
 * Returns a string. It is typically used to generate blurDataURL with Base64 for Image components in Next.js.
 * @see https://nextjs.org/docs/pages/api-reference/components/image#blurdataurl
 * @see https://fffuel.co/ffflux/
 * @returns string
 * @example
 * import Image from "next/image";
 <Image
    className={styles.posterImg}
    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
    width={300}
    height={450}
    priority
    alt={`${title}`}
    onClick={() => setIsGalleryVisible(true)}
    placeholder="blur"
    blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
      300,
      400
    )}`}
  />
*/

export const generateShimmer = (
  width: number = 300,
  height: number = 400,
  brigtnessTop: number | undefined = 45,
  brigtnessBottom: number | undefined = 70
): string => {
  return toBase64(shimmer(width, height, brigtnessTop, brigtnessBottom));
};
