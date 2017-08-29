const path = require('path');
const webpackStream = require('webpack-stream');

const webpack = webpackStream.webpack;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ComponentDirectoryPlugin = require("component-directory-webpack-plugin");
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function _path(p) {
  return path.join(__dirname, p);
}

const curEnv = isDevelopment ? 'development' : 'production';
const config = {
  development: {
    plugins: {
      UglifyJSPlugin: {
        compress: false,
        // mangle: {
        //   // Skip mangling these
        //  except: ['$super', '$', 'exports', 'require']
        // },
        mangle: false,
        beautify: true,
        sourceMap: false,
      },
    },
  },
  production: {
    plugins: {
      UglifyJSPlugin: {
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
        sourceMap: false,
      },
    },
  },
};
const webpackConfig = {
  // click on the name of the option to get to the detailed documentation
  // click on the items with arrows to show more examples / advanced options

  entry: {
    // animations: path.resolve(__dirname, 'src/animations.js'),
    // mobile: path.resolve(__dirname, 'src/mobile.js'),
    app: path.resolve(__dirname, 'src/app.js'),
  }, // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, 'tmp/assets/scripts'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name].js', // string
    // the filename template for entry chunks

    // publicPath: path.resolve(__dirname, "."), // string
    // the url to the output directory resolved relative to the HTML page

    library: ['App', '[name]'], // string,
    // the name of the exported library (Global object)

    libraryTarget: 'umd', // universal module definition
    // the type of the exported library

    /* Advanced output configuration (click to show) */
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  modules: false,
                  useBuiltIns: true,
                  debug: true,
                },
                ],
              ],
              plugins: ['transform-remove-strict-mode', 'transform-object-assign', 'transform-object-rest-spread'],
            },
          },
        ],
      },
    ],
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'assets/styles/vendors'),
    ],
    // directories where to look for modules

    extensions: ['.js', '.jsx', '.scss'],
    // extensions that are used

    alias: {
      // a list of module name aliases
      vendors: path.resolve(__dirname, 'src/vendors/'),
      components: path.resolve(__dirname, 'src/components/'),
      utils: path.resolve(__dirname, 'src/components/utils/'),
      npm: path.resolve(__dirname, 'node_modules/'),

      // Switch dependency lib accordingly (this one uses jquery)
      'inputmask.dependencyLib': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
      // Core library (order of these aliases shouldn't matter FYI)
      inputmask: _path('node_modules/jquery.inputmask/dist/inputmask/inputmask'),
      // Allows use of jquery input mask via jquery chaining api/$('selector').inputmask(...)
      'jquery.inputmask':
        _path('node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
      // Add extensions following the
      // pattern below remember to import them as necessary in your .js files
      'inputmask.numeric.extensions': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),

      'viewport-units-buggyfill': _path('node_modules/viewport-units-buggyfill/viewport-units-buggyfill'),
      'viewport-units-buggyfill.hacks': _path('node_modules/viewport-units-buggyfill/viewport-units-buggyfill.hacks'),
      // ScrollMagic dependencies from GSAP
      TweenLite: path.resolve('node_modules', 'gsap/TweenLite.js'),
      TweenMax: path.resolve('node_modules', 'gsap/TweenMax.js'),
      TimelineLite: path.resolve('node_modules', 'gsap/TimelineLite.js'),
      TimelineMax: path.resolve('node_modules', 'gsap/TimelineMax.js'),
      // ScrollMagic bundles and dependencies
      ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      ScrollMagic__gsap: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      ScrollMagic__debug: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
      ScrollMagic__jquery: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic.js'),

      // "module": "new-module",
      // // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
      //
      // "only-module$": "new-module",
      // // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"
      //
      // "module": path.resolve(__dirname, "app/third/module.js"),
      // alias "module" -> "./app/third/module.js" and "module/file" results in error
      // modules aliases are imported relative to the current context
    },

    // /* alternative alias syntax (click to show) */
    // alias: [
    //   {
    //     name: "module",
    //     // the old request
    //
    //     alias: "new-module",
    //     // the new request
    //
    //     onlyModule: true
    //     // if true only "module" is aliased
    //     // if false "module/inner/path" is also aliased
    //   }
    // ],

    // /* Advanced resolve configuration (click to show) */
    //
    // symlinks: true,
    // // follow symlinks to new location
    //
    // descriptionFiles: ["package.json"],
    // // files that are read for package description
    //
    // mainFields: ["main"],
    // // properties that are read from description file
    // // when a folder is requested
    //
    // aliasFields: ["browser"],
    // // properites that are read from description file
    // // to alias requests in this package
    //
    // enforceExtension: false,
    // // if true request must not include an extensions
    // // if false request may already include an extension
    //
    // moduleExtensions: ["-module"],
    // enforceModuleExtension: false,
    // // like extensions/enforceExtension but for module names instead of files
    //
    // unsafeCache: true,
    // unsafeCache: {},
    // // enables caching for resolved requests
    // // this is unsafe as folder structure may change
    // // but preformance improvement is really big
    //
    // cachePredicate: (path, request) => true,
    // // predicate function which selects requests for caching
    //
    // plugins: [
    //   // ...
    // ]
    // additional plugins applied to the resolver
  },

  /*  performance: {
      hints: "warning", // enum
      maxAssetSize: 200000, // int (in bytes),
      maxEntrypointSize: 400000, // int (in bytes)
      assetFilter: function(assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },*/

  devtool: 'source-map', // enum
  watch: isDevelopment,
  // watchOptions: {
  // 	aggregateTimeout: 100,
  // },
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  // context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  // target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // externals: ["react", /^@angular\//],
  externals: [
    'TweenLite',
    'window',
    {
      jquery: 'jQuery',
    },
  ],
  // Don't follow/bundle these modules, but request them at runtime from the environment


  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      domready: 'domready',
    }),
    new UglifyJSPlugin(
      config[curEnv].plugins.UglifyJSPlugin
    ),
    // new webpack.ResolverPlugin(new ComponentDirectoryPlugin(true))
    // resolve require('components/demo') as components/demo/demo.js || index.js
  ],
  // list of additional plugins
};

module.exports = webpackConfig;
