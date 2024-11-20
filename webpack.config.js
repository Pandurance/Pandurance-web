// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ImageminAvifWebpackPlugin = require("imagemin-avif-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

let htmlPageNames = ["blog", "about_site", "doc", "about_sponsor", "copyright", "error"];

let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    favicon: "./assets/img/favicon/favicon.ico",
    template: `./pages/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
  });
});

const config = {
  entry: path.resolve(__dirname, "assets/js/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./assets/img/favicon/favicon.ico",
      template: path.resolve(__dirname, "/pages/index.html"),
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ]
    .concat(multipleHtmlPlugins)
    .concat([
      new ImageminAvifWebpackPlugin({
        config: [
          {
            test: /\.(jpe?g|png)/,
            options: {
              quality: 100,
            },
          },
        ],
        overrideExtension: true,
        detailedLogs: false,
        silent: false,
        strict: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./assets/img/favicon" }],
      }),
    ]),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(txt)$/i,
        use: "raw-loader",
      },
      {
        test: /\.(eot|woff|woff2|png|jpg|gif|ttf|avif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(svg)$/i,
        type: "asset/resource",
        loader: "svgo-loader",
      },

      // css file: extract to css file with mini extract plugin
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
