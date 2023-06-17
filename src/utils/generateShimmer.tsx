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

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:svgjs="http://svgjs.dev/svgjs"
  viewBox="0 0 700 700"
  width="700"
  height="700"
  opacity="1"
>
  <defs>
    <linearGradient
      gradientTransform="rotate(183, 0.5, 0.5)"
      x1="50%"
      y1="0%"
      x2="50%"
      y2="100%"
      id="ffflux-gradient"
    >
      <stop stop-color="hsl(0, 0%, 100%)" stop-opacity="1" offset="0%"></stop>
      <stop stop-color="hsl(0, 0%, 0%)" stop-opacity="1" offset="100%"></stop>
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
        baseFrequency="0.003 0.003"
        numOctaves="1"
        seed="230"
        stitchTiles="stitch"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        result="turbulence"
      ></feTurbulence>
      <feGaussianBlur
        stdDeviation="22 18"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="turbulence"
        edgeMode="duplicate"
        result="blur"
      ></feGaussianBlur>
      <feBlend
        mode="color-dodge"
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
  <rect
    width="700"
    height="700"
    fill="url(#ffflux-gradient)"
    filter="url(#ffflux-filter)"
  ></rect>
</svg>; */
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const generateShimmer = (
  width: number,
  height: number,
  brigtnessTop: number | undefined = 45,
  brigtnessBottom: number | undefined = 70
) => {
  return toBase64(shimmer(300, 400, brigtnessTop, brigtnessBottom));
};
