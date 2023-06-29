module.exports = {
  plugins: [
      "postcss-flexbugs-fixes",
      [
          "postcss-preset-env",
          {
              autoprefixer: {
                  flexbox: true,
                  grid: "autoplace",
              },
              stage: 3,
              features: {
                  "custom-properties": true,
              },
          },
      ],
  ],
};