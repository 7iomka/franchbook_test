const pkg = require('./package.json');
const fractal = require('./fractal.js');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const a11y = require('gulp-a11y');
const ghPages = require('gulp-gh-pages');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const postcssAssets = require('postcss-assets');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sassJson = require('node-sass-json-importer');
const stylelint = require('gulp-stylelint');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');

const logger = fractal.cli.console;
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const gulplog = require('gulplog');
const gutil = require('gulp-util');
const merge = require('merge-stream');
const flatten = require('gulp-flatten');
const cache = require('gulp-cached');
const inlinesource = require('gulp-inline-source');
const inject = require('gulp-inject');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel.js');
const named = require('vinyl-named');
const mkdirp = require('mkdirp');
const cleanDest = require('gulp-clean-dest');
const browserSync = require('browser-sync').create();

const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const wrap = require('gulp-wrap');
const through = require('through2');
const tap = require('gulp-tap');
const foreach = require('gulp-foreach');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
  // build: __dirname + '/www',
  dest: __dirname + (isDevelopment ? '/tmp' : '/www'),
  src: `${__dirname}/src`,
  modules: `${__dirname}/node_modules`,
};

// if is production
// if (!isDevelopment) {
//   paths.dest = __dirname + '/www'
// }

// Build static site (Fractal)
// function build() {
//   const builder = fractal.web.builder();
//
//   builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
//   builder.on('error', err => logger.error(err.message));
//
//   return builder.build().then(() => {
//     logger.success('Fractal build completed!');
//   });
// };


// Serve dynamic site (Fractal)
function serve() {
  const server = fractal.web.server({
    sync: false,
    watch: true,
    injectChanges: true,
    port: 3200,
    proxy: 'http://localhost:3030/', // localhost served url
  });

  browserSync.init({
    injectChanges: true,
    notify: true,
    port: 3030,
    proxy: 'http://localhost:3200/', // localhost served url

  });

  const logError = err => logger.error(err.message);
  const logRunning = () => logger.success(`Fractal server is now running at ${server.url}`);


  server.on('error', logError)
    .start()
    .then(logRunning);
}

// Clean
function clean() {
  return del(`${paths.dest}/**/*`);
}

// Deploy to GitHub pages
function deploy() {
  // Generate CNAME file from `homepage` value in package.json
  const cname = pkg.homepage.replace(/.*?:\/\//g, '');
  fs.writeFileSync(`${paths.build}/CNAME`, cname);

  // Push contents of build folder to `gh-pages` branch
  return gulp.src(`${paths.build}/**/*`)
    .pipe(ghPages({
      force: true,
    }));
  done();
}

// make animation json file
// function animations(done) {
//   gulp.src(`${paths.src}/components/global/anim-icon/animations/**/*.json`)
//
//     .pipe(foreach((stream, file) => {
//       const curLongPath = path.dirname(file.path);
//       const dirName = curLongPath.split(/[\\/]/).pop();
//       return stream
//         .pipe(wrap('"<%= dirnName %>":<%= contents %>,', { dirnName: dirName }, { parse: false }));
//     }))
//     .pipe(concat('animations.js'))
//     .pipe(wrap('var animations = {<%= contents %>}; module.exports = animations;'))
//     .pipe(gulp.dest(`${paths.src}/components/global/anim-icon/animations`));
//   done();
// }
// gulp.task('animations', animations);

// backend files
function backendFiles() {
  const coreFiles = gulp.src(
    [
      `${paths.src}/*.{txt,json,php,html}`,
      `${paths.src}/uploads`,
      `${paths.src}/.htaccess`,
    ]
  )
    .pipe(gulp.dest(paths.dest));

  const incFiles = gulp.src(`${paths.src}/inc/**/*.*`)
    .pipe(gulp.dest(`${paths.dest}/inc`));

  const libFiles = gulp.src(`${paths.src}/lib/**/*.*`)
    .pipe(gulp.dest(`${paths.dest}/lib`));


  return merge(coreFiles, incFiles, libFiles);
}


// Fonts
function fonts() {
  return gulp.src(`${paths.src}/assets/fonts/**/*`)
    .pipe(gulp.dest(`${paths.dest}/assets/fonts`));
}

// Icons
function icons() {
  return gulp.src(`${paths.src}/assets/favicons/**/*`)
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'favIcons',
        message: err.message,
      })),
    }))
    // .pipe(gulpIf(!isDevelopment, imagemin()))
    .pipe(gulp.dest(`${paths.dest}/assets/favicons`));
}

// Images
function images() {
  return gulp.src(`${paths.src}/assets/images/**/*`)
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Images',
        message: err.message,
      })),
    }))
    .pipe(gulpIf(!isDevelopment, imagemin({
      progressive: true,
    })))
    .pipe(gulp.dest(`${paths.dest}/assets/images`));
}

// Images
function videos() {
  return gulp.src(`${paths.src}/assets/videos/**/*`)

    .pipe(gulp.dest(`${paths.dest}/assets/videos`));
}

// Vectors
function vectors() {
  // var mergeAssortimentFilesToVectorsFolder = gulp.src(paths.src + '/assets/images/sections/assortiment/**/*.svg')
  //     .pipe(cache('vectors caching'))
  //     .pipe(flatten())
  //     .pipe(gulp.dest(paths.src + '/assets/vectors/'));

  const mergeAllVectorsToDest = gulp.src(`${paths.src}/assets/vectors/**/*`)
    .pipe(gulp.dest(`${paths.dest}/assets/vectors`));

    // merge(mergeAssortimentFilesToVectorsFolder, mergeAllVectorsToDest);
  return mergeAllVectorsToDest;
}

function prepareVectors() {
  // More complex configuration example
  const config = {
    shape: {
      // transform: [], // disable svgo
      // id {
      //       generator: '%s'  // generate id by name of file
      // },
      // dimension: { // Set maximum dimensions
      //   maxWidth: 32,
      //   maxHeight: 32
      // },
      // spacing: { // Add padding
      //   padding: 10
      // },
      // dest: 'src' // Keep the intermediate files (/src)
    },
    mode: {
      // view: { // Activate the «view» mode
      //   bust: false,
      //   render: {
      //     scss: true // Activate Sass output (with default options)
      //   }
      // },
      defs: { // Activate the «defs» mode (symbol also possible)
        dest: 'sprite',
        sprite: 'sprite.svg',
        example: {
          dest: 'sprite-preview.html',
        },

      },
    },
    transform: [
      {
        svgo: {
          plugins: [
            {
              removeViewBox: false,
            }, {
              removeUselessStrokeAndFill: false,
            }, {
              cleanupIDs: false,
            }, {
              mergePaths: false,
            }, {
              removeUnknownsAndDefaults: false,
            },
          ],
        },
      },
    ],
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
      namespaceIDs: false,
    },
  };

  // gulp.src('**/*.svg', {cwd: 'path/to/assets'})
  return gulp.src('**/*.svg', { cwd: `${paths.src}/assets/vectors` })
  	.pipe(svgSprite(config))
  	.pipe(gulp.dest(`${paths.src}/assets/vectors/`));
}

// function cleanOldGereratedSprite() {
//   return del(paths.src + '/assets/vectors/sprite');
// };
//
// gulp.task('prepareVectors', gulp.series(cleanOldGereratedSprite,prepareVectors));
// gulp.task('vectors', gulp.series('prepareVectors', vectors));

gulp.task('vectors', vectors);


// Linting
function lintstyles() {
  return gulp.src(`${paths.src}/**/*.scss`)
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true,
      }],
    }));
}

// Styles
function styles() {
  const sassStyles = gulp.src(`${paths.src}/assets/styles/app.scss`)
    .pipe(sourcemaps.init())
    .pipe(sassGlob({
      ignorePaths: [
        '**/site-header.scss',
        '**/logo.scss',
        '**/site-loader.scss',
      ],
    }))
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [`${paths.src}/tokens/`],
      importer: sassJson,
    }).on('error', sass.logError))
    .pipe(
      postcss([
        postcssAssets({
          loadPaths: [`${paths.src}/assets/vectors`],
        }),
        autoprefixer({
          browsers: ['last 100 versions'],
        }),
      ])
    )
    .pipe(gulpIf(!isDevelopment, csso()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dest}/assets/styles`))
    .pipe(browserSync.stream({ match: '**/*.css' }));


  return sassStyles;
}


function separateStyles() {
  const separatedStyles = gulp.src(`${paths.src}/assets/styles/separate/header.scss`)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [`${paths.src}/tokens/`],
      importer: sassJson,
    }).on('error', sass.logError))
    .pipe(postcss([
      postcssAssets({
        loadPaths: [`${paths.src}/assets/vectors`],
      }),
      autoprefixer({
        browsers: ['last 100 versions'],
      }),
    ]))
    .pipe(gulpIf(!isDevelopment, csso()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dest}/assets/styles/`))
    .pipe(browserSync.stream({ match: '**/*.css' }));

  return separatedStyles;
}

function separateVendors() {
  const separatedVendors = gulp.src(`${paths.src}/assets/styles/separate/vendors/**/*`)
    .pipe(gulpIf(!isDevelopment, csso()))
    .pipe(gulp.dest(`${paths.dest}/assets/styles/vendors/`));


  return separatedVendors;
}

gulp.task('styles', gulp.series(styles, separateStyles, separateVendors));

// injectFiles
function injectPreview() {
  const target = gulp.src(`${paths.src}/components/partials/_preview.html`);
  const inlinesourceOptions = {
    compress: true,
    rootpath: paths.dest,
  };

  return target.pipe(inlinesource(inlinesourceOptions))
    // // inject svg inline in preview page
    // .pipe(inject(gulp.src([paths.src + '/assets/vectors/sprite/sprite.svg']), {
    //      starttag: '<!-- inject:sprite.svg -->',
    //      transform: function(filepath, file) {
    //        return file.contents.toString('UTF-8');
    //      }
    //   }))

    .pipe(gulp.dest(paths.dest));
}
// /**
//  * Может делать замены в html
//  */
// function changesDOM(){
//   // generated preview
//   gulp.src(paths.dest + '/_preview.html')
//   // make dynamic viewbox
//   .pipe(cheerio(function ($, file) {
//       $('.site-vectors > svg > defs > svg').each(function(){
//         var id = $(this).attr('id');
//         var viewbox = $(this).attr('viewbox');
//         var $useCollection = $('svg > use[xlink\\:href=#'+id+']');
//         if($useCollection) {
//           $useCollection.each(function(){
//             var $svg = $(this).closest('svg');
//             $svg.attr('viewbox', viewbox);
//           })
//         }
//       });
//
//     }))
//   .pipe(gulp.dest(paths.dest));
// }

// Accessibility audit
function audit() {
  return gulp.src(`${paths.build}/components/preview/**/*.html`)
    .pipe(a11y())
    .pipe(a11y.reporter());
}


/** gulp task for webpack - js files **/
gulp.task('webpack', (cb) => {
  let firstBuildReady = false;
  //
  function done(err, stats) {
    firstBuildReady = true;

    if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return; // emit('error', err) in webpack-stream
    }

    console.log(stats.toString({
      colors: true,
      assets: false,
      chunks: false,
      hash: false,
      version: false,
    }));

    // gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
    //   colors: true
    // }));
  }

  /** Webpack options **/
  const options = Object.create(webpackConfig);
  return gulp.src(
    [
      // `${paths.src}/animations.js`,
      `${paths.src}/app.js`,
    ]
  )
    .pipe(plumber())
    .pipe(named())
  // .pipe(named()) //-- будем юзать если нужно будет несколько точек входа
    .pipe(
      webpackStream(
        options,
        webpack, // вторым параметром идёт 2-ая версия установленного webpack
        done))
  // .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulp.dest(`${paths.dest}/assets/scripts`))
    .on('data', () => {
      if (firstBuildReady) {
        cb();
      }
    });
});

// // separate js files (vendors)
// function separateScripts() {
//   return gulp.src(paths.src + '/assets/scripts/vendors/**/*.js')
//   .pipe(gulp.dest(paths.dest + '/assets/scripts/vendors'));
// };
// separate js files (separate backend and json files)
function separateScripts() {
  return gulp.src(`${paths.src}/assets/scripts/**/*.*`)
    .pipe(gulp.dest(`${paths.dest}/assets/scripts`));
}


// Watch
function watch(done) {
  serve();

  gulp.watch(`${paths.src}/assets/fonts`, fonts).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });
  gulp.watch(`${paths.src}/assets/icons`, icons).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });
  gulp.watch(`${paths.src}/assets/images`, images).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });
  // векторы
  gulp.watch(
    [
      `${paths.src}/assets/vectors`,
    ], gulp.series('vectors')).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });
  // иконки анимации
  // gulp.watch(
  //   [
  //     `${paths.src}/components/global/anim-icon/animations/**/*.json`,
  //   ], gulp.series('animations')).on('error', (error) => {
  //   // silently catch 'ENOENT' error typically caused by renaming watched folders
  //   if (error.code === 'ENOENT') {
  //
  //   }
  // });


  // мониторинг стилей
  gulp.watch([
    `${paths.src}/**/*.{scss}`,
  // ], gulp.series(styles,separateStyles)).on('error', function(error) {
  ], gulp.series('styles', injectPreview)).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });

  gulp.watch([
    `${paths.src}/components/partials/_preview.html`,
  ], gulp.series(injectPreview)).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });
  gulp.watch(`${paths.src}/assets/scripts`, separateScripts).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });
  gulp.watch([
    `${paths.src}/*.{txt,json,php,html}`,
    `${paths.src}/inc`,
    `${paths.src}/lib`,
    `${paths.src}/uploads`,

  ], backendFiles).on('error', (error) => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {

    }
  });

  done();
}

// Task sets
const compile = gulp.series(clean, gulp.parallel(backendFiles, fonts, icons, images, videos, 'vectors', 'styles', separateScripts, 'webpack'), injectPreview);
// const compile = gulp.series(clean, gulp.parallel( scripts));


gulp.task('start', gulp.series(compile, serve));
gulp.task('lint', gulp.series(lintstyles));
gulp.task('dev', gulp.series(compile, watch));
// gulp.task('test', gulp.series(build, audit));
// gulp.task('publish', gulp.series(build, deploy));


// Clean build dirrectory
function cleanBuild(cb) {
  return gulp.src('www/**/*')
    .pipe(cleanDest('www'));
  cb();
}

// при билде незабыть настроить changesDOM
const compileBuildAssets = gulp.series(gulp.parallel('webpack', backendFiles, fonts, icons, images, videos, 'vectors', 'styles', separateScripts), injectPreview);
gulp.task('cleanBuild', cleanBuild);
gulp.task('compileBuildAssets', compileBuildAssets);
gulp.task('customBuild', customBuild);

function renderComponent(args, done) {
  const app = fractal;
  const target = app.components.find(args.component);
  if (target) {
    app.components.render(target, null, null, {
      preview: args.options.layout,
    }).then((html) => {
      const filePath = path.join('./', args.options.output || '', `${target.handle}.html`);
      fs.writeFile(filePath, html, (err) => {
        if (err) {
          app.cli.console.error(`Error rendering ${args.component} - ${err.message}`);
        } else {
          app.cli.console.success(`Component ${args.component} rendered to ${filePath}`);
        }
        done();
      });
    });
  } else {
    app.cli.console.error(`Component ${args.component} not found`);
  }
}

function customBuild(cb) {
  const destdir = 'www/';
  fractal.components.load().then(() => {
    for (const item of fractal.components.flatten()) {
      if (item.relViewPath.startsWith('templates')) {
        renderComponent({
          component: `@${item.handle}`,
          options: {
            output: destdir,
            layout: true,
          },
        }, () => {
          fractal.cli.log(`@${item.handle} render completed`);
        });
      }
    }
  });

  cb();
}

gulp.task('build', gulp.series(cleanBuild, compileBuildAssets, customBuild));


//
fractal.components.on('updated', (e) => {
  // console.log('fractal components updated', e);
  if (e.event === 'change') {
    if (e.isResource) {
      // browserSync.stream(); // Скомпилированный SASS в scc -- сделать auto-inject в браузер
      // browserSync.stream(); // Скомпилированный SASS в scc -- сделать auto-inject в браузер
      console.log('Изменился JS или CSS компонента: ', e.path);
    } else {
      console.log('Изменился конфиг или темплейт компонента: ', e.path);
      browserSync.reload();
    }
  }
});
