var path = require('path'),
    _ = require('lodash'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

const vendor = [
  "lodash"
]

const config = createConfig(process.env.NODE_ENV !== "production")


function createConfig(isDebug) {
  const devtool = isDebug ? 'cheap-module-source-map' : undefined
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
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
    css:    {test: /\.css$/, use: ["style-loader","css-loader?sourceMap-loader"], exclude: /node_modules/ },
    sass:   {test: /\.scss$/, use: ["style-loader","css-loader?sourceMap-loader","sass-loader?sourceMap-loader"], exclude: /node_modules/ },
    files:  { test:/\.(tif|tiff|png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)(\?\S*)?$/, loader: "url-loader?limit=5000"}
  }

  const clientEntry = ["./src/client/client.js"]
  let publicPath = "/build/"

  if (isDebug) {
    console.log("Debug Mode")
  } else {
    const extract_CSS = new ExtractTextPlugin("[name].css")
    const extract_SCSS = new ExtractTextPlugin("[name].css")
    plugins.push(
      // new webpack.optimize.DedupePlugin(),
      extract_CSS,
      extract_SCSS,
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    )
    rules.css.use = extract_CSS.extract({
      fallback: "style-loader",
      use: [{
        loader: "css-loader",
        options: {
          minimize: true
        }
      }]
    }),
    rules.sass.use = extract_SCSS.extract({
      fallback: 'style-loader',
      //resolve-url-loader may be chained before sass-loader if necessary
      use: [{
        loader: "css-loader",
        options: {
          minimize: true
        }
      }, 'sass-loader']
    })
  }

  return {
    name: "client",
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
    plugins
  }
}


module.exports = config
