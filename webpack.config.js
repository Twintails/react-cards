var path = require('path'),
    _ = require('lodash'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const vendor = [
  "lodash",
  "react",
  "react-dom",
  "react-router-dom",
  "socket.io-client",
  "rxjs"
]

const config = createConfig(process.env.NODE_ENV !== "production")


function createConfig(isDebug) {
  const devtool = isDebug ? 'eval-source-map' : undefined
  const mode = isDebug ? 'development' : 'production'
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV || "development"}"`
      },
      IS_PRODUCTION: !isDebug,
      IS_DEVELOPMENT: isDebug
    })
  ]

  const rules = {
    js:     {test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
    eslint: {test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/ },
    css:    {
      test: /\.css$/, use: [
        { loader: 'style-loader', options: { injectType: 'styleTag' }},
        // { loader: 'file-loader' },
        { loader: "css-loader", options: { sourceMap: true }}
      ],
      exclude: /node_modules/ },
    sass:   {
      test: /\.scss$/, use: [
        { loader: 'style-loader', options: { injectType: 'styleTag' }},
        // { loader: 'file-loader' },
        { loader: "css-loader", options: { sourceMap: true }},
        { loader: "sass-loader", options: { sourceMap: true }}
      ], exclude: /node_modules/ },
    files:  { test:/\.(tif|tiff|png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)(\?\S*)?$/, loader: "url-loader?limit=5000"}
  }

  const clientEntry = [ "./src/client/client"]
  let publicPath = "./build/"

  if (isDebug) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    clientEntry.unshift(
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:8080/",
      "webpack/hot/only-dev-server"
    )
    publicPath = "http://localhost:8080/build/"
  } else {
    const extract_CSS = new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDebug ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDebug ? '[id].css' : '[id].[hash].css',
    })

    plugins.push(
      extract_CSS,
    )
    rules.css.use = extract_CSS.extract({
      fallback: "style-loader",
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
      }]
    }),
    rules.sass.use = extract_SCSS.extract({
      fallback: 'style-loader',
      //resolve-url-loader may be chained before sass-loader if necessary
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        'css-loader',
        'sass-loader',
      ]
    })
  }

  return {
    name: "client",
    mode,
    devtool,
    entry: {
      app: clientEntry,
      vendor
    },
    output: {
      path: path.join(__dirname, "public", "build"),
      filename: "[name].js",
      publicPath
    },
    resolve: {
      extensions: ['.js','.jsx'],
      alias: {
        shared: path.join(__dirname, 'src', 'server', 'shared')
      }
    },
    module: {
      rules: _.values(rules)
    },
    optimization: {
      minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: { warnings: false },
            ecma: 6,
            mangle: true
          },
          sourceMap: false
        })
      ]
    },
    plugins
  }
}


module.exports = config
