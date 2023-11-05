const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin"); 
const { dependencies } = require("./package.json");
const path = require("path");


module.exports = {
    entry: "./src/entry.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  mode: "development",
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
        ],
      },
   
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: "Header",  
            filename: "remoteEntry.js",  
            exposes: { 
              "./Header": "./src/App.js",  
              "./Titles/Title2": "./src/Title2.jsx",  

            },
            shared: {  
              ...dependencies,  
              react: { 
                singleton: true,
                requiredVersion: dependencies["react"],
              },
              "react-dom": { // react-dom
                singleton: true,
                requiredVersion: dependencies["react-dom"],
              },
            },
        }),
    ],
   
};