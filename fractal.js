const fractal = require('@frctl/fractal').create();
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const prependFile = require('prepend-file');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
  build: `${__dirname}/www`,
  src: `${__dirname}/src`,
  static: `${__dirname}/tmp`,
};

const components = {
  common: `${__dirname}/src/components/common`,
  global: `${__dirname}/src/components/global`,
  partial: `${__dirname}/src/components/partials`,
  section: `${__dirname}/src/components/sections`,
  template: `${__dirname}/src/components/templates`,
};

const mandelbrotCustom = require('@frctl/mandelbrot')({
  favicon: '/assets/icons/icon.ico',
  lang: 'ru-ru',
  styles: ['default'/**, '/assets/styles/theme.css'*/],
  static: {
    mount: 'zx',
    ignored: '',
  },
  skin: 'maroon',
});

const mdAbbr = require('markdown-it-abbr');
const mdPrism = require('markdown-it-prism');
const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  typographer: true,
}).use(mdAbbr).use(mdPrism, {
  plugins: [
    'highlight-keywords',
    'show-language',
  ],
});

const nunjucks = require('@frctl/nunjucks')({
  filters: {
    date: require('nunjucks-date'),
    markdown(str) {
      return md.render(str);
    },
    markdownInline(str) {
      return md.renderInline(str);
    },
    slugify(str) {
      return str.toLowerCase().replace(/[^\w]+/g, '');
    },
    stringify() {
      return JSON.stringify(this, null, '\t');
    },
    // {% set modifiedArray = myArray|pushIn('myValue') %}
    pushIn(array, value) {
      array.push(value);
      return array;
    },
    addToObj(obj, key, value) {
      obj[key] = value;
      return obj;
    },
    objAssign(obj, newObj) {
      return Object.assign({}, obj, newObj);
    },
    isString(obj) {
      return typeof obj === 'string';
    },
    isObject(obj) {
      return typeof obj === 'object';
    },
    makePrice(str) {
      return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    },
    pathImg(str) {
      return `../../${str.toString()}`;
    },
    pathlink(str) {
      return `/components/preview/${str.toString()}`;
    },
  },
  paths: [
    `${paths.static}/assets/vectors`,
    `${paths.src}/components/_macros`,
  ],
});

// Project config
fractal.set('project.title', 'build_light_easy');

// Components config
fractal.components.engine(nunjucks);
fractal.components.set('default.preview', `${paths.static}/_preview.html`);
fractal.components.set('default.status', 'prototype');
fractal.components.set('ext', '.html');
fractal.components.set('path', `${paths.src}/components`);

// Docs config
fractal.docs.engine(nunjucks);
fractal.docs.set('ext', '.md');
fractal.docs.set('path', `${paths.src}/docs`);

// specify a directory to hold the theme override templates
mandelbrotCustom.addLoadPath(`${__dirname}/mandelbrot-custom`);

// Web UI config
fractal.web.theme(mandelbrotCustom);
// const codemirrorPath = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.0';
// const themex = require('@frctl/mandelbrot')({
//   // for YAML context data editing
//   format: 'yaml',
//   scripts: [
//     `${codemirrorPath}/codemirror.min.js`,
//     `${codemirrorPath}/mode/yaml/yaml.min.js`,
//     'default',
//   ],
//   styles: [
//     `${codemirrorPath}/codemirror.min.css`,
//     'default',
//   ]
// });

// fractal.web.theme(themex);
// fractal.components.set('context.editable', true);
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);
fractal.web.set('builder.urls.ext', '.html');
// fractal.web.set('server.syncOptions', {
//     injectChanges: true,
//     // proxy: 'localhost:3000', // localhost served url
//     notify: false,
//     reloadDelay: 2000
// });


// fractal.web.set('server.syncOptions', {
//     open: true,
//     notify: true,
//     reloadDelay: 3000,
//     tunnel: true
// });
/**
 * Custom builder function for pisibility render single component separately from CLI
 */

function renderComponent(args, done) {
  const app = this.fractal;
  const target = app.components.find(args.component);
  if (target) {
    app.components.render(target, null, null, {
      // preview: args.options.layout
      preview: true,
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


/**
 * funсtion Create component from CLI command
 */

function createComponent(args, done) {
  const app = this.fractal;
  // set by default componentType to common (most popular use)
  let componentType = 'common';

  // iterate options (componentType)
  if (args.options.common) {
    componentType = 'common';
  }
  if (args.options.global) {
    componentType = 'global';
  }
  if (args.options.partial) {
    componentType = 'partial';
  }
  if (args.options.section) {
    componentType = 'section';
  }
  if (args.options.template) {
    componentType = 'template';
  }

  // instance
  const correspondedDir = `${components[componentType]}`;
  // if this is section-component, necessary to set inner page-dir in which he will be
  const innerPageDir = args.options.section ? `${args.options.section}/` : '';
  // finally full path to component dir
  const componentDir = `${correspondedDir}/${innerPageDir}${args.component}`;


  // necessary files with data for component dir
  const componentFiles = [
    {
      extension: '.config.yaml',
      data: '',
    },
    {
      extension: '.html',
      data: '',
    },
    {
      extension: '.js',
      data: '',
    },
    {
      extension: '.scss',
      data: '',
    },
  ];

  // we make componentDir and
  // if this successfully created - create files
  // with the same name and pass data inside them
  mkdirp(componentDir, (err) => {
    if (err) {
      app.cli.console.error(`Error in creation componentDir - ${err.message}`);
    } else {
      app.cli.console.success(`componentDir created with success ${componentDir}`);
    }
  });

  // if component dir exist
  for (const file of componentFiles) {
    prependFile(`${componentDir}/${args.component}${file.extension}`, `${file.data}`, (err) => {
      if (err) {
        app.cli.console.error(`Error creating or inserting data in ${args.component}${file.extension} - ${err.message}`);
      } else {
        app.cli.console.success(`File ${args.component}${file.extension} created with success`);
      }
    });
  }
  done();
}


fractal.cli.command('create <component>', createComponent, {
  description: 'Create a component',
  options: [
    ['-c, --common', 'Create a common component'],
    ['-g, --global', 'Create a global component'],
    ['-p, --partial', 'Create a parial'],
    ['-s, --section <page-dir>', 'Create a section'],
    ['-t, --template', 'Create a template'],
  ],
});

fractal.cli.command('render <component>', renderComponent, {
  description: 'Render a component',
  options: [
    ['-l, --layout', 'Render the component within it\'s preview layout.'],
    ['-o, --output <output-dir>', 'The directory to render the component into, relative to the CWD.'],
  ],
});


fractal.cli.command('get env', () => {
  console.log('isDevelopment:', isDevelopment);
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
});


// Export config
module.exports = fractal;
