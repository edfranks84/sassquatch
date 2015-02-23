module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var BUILD_DIR = '.';

  // The order matters!
  // var jsFiles = [
  //   '/js/plugins/*.js',
  //   '/js/src/*.js',
  //   '/js/src/**/*.js'
  // ];

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>*/\n',

    notify: {
      sass:{
        options: {
          title: "Building CSS Files",
          message: "Sass task completed, Captain <%= pkg.author.name %>"
        }
      },
      uglify:{
        options: {
          title: "Building JS Files",
          message: "JS uglified <%= pkg.author.name %>"
        }
      },
      watch: {
        options: {
          title: 'Task Complete',  // optional
          message: 'SASS and Uglify finished running', //required
        }
      },
      server: {
        options: {
          message: 'Server is ready!'
        }
      }
    },

    concat: {
      dev: {
        options: {
          stripBanners: true,
          separator: ';'
        },
        src: '/js/main.js',
        dest: '/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      production: {
        options: {
          report: 'min',
          banner: '<%= banner %>'
        },
        files: {
          '/js/<%= pkg.name %>.min.js': '/js/main.js'
        }
      }
    },

    // Make our SVGs smaller
    svgmin: {
      options: { // Configuration that will be passed directly to SVGO
        plugins: [{
            removeViewBox: false
        }],
      },
      dist: {
        files: [{
          expand: true,
          cwd: '/images/svgs', // Src matches are relative to this path.
          src: ['**/*.svg'], // Actual pattern(s) to match.
          dest: '/images/', // Destination path prefix.
          ext: '.min.svg' // Dest filepaths will have this extension.
        }],
      },
    },

    //mMake our svg sprites
    svgstore: {
      options: {
        /*
        prefix all icons with an unambiguous label
        */
        prefix : 'shape-',
        /*
        cleans fill, stroke, stroke-width attributes
        so that we can style them from CSS
        */
        cleanup: true,
      },
      default : {
        files: {
          '/images/svg-defs.svg': ['/images/svgs/*.svg'],
        }
      }
    },

    // Compile SASS
    sass: {
      app: {
        // Takes every file that ends with .scss from the scss 
        // directory and compile them into the css directory. 
        // Also changes the extension from .scss into .css. 
        // Note: file name that begins with _ are ignored automatically
        files: [{
          expand: true,
          cwd: '/scss',
          src: ['*.scss'],
          dest: '/css',
          ext: '.css'
        }]
      },
      options: {
        sourceMap: true, 
        outputStyle: 'nested'
      }
    },

    // Automatically add required CSS prefixes
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'ie 8'],
      },
      dist: {
        src: '/css/style.css',
      },
    },

    // Add rem px fallbacks
    remfallback: {
      options: {
        log: true,
        replace: false,
      },
      dist: {
        files: {
          '/css/style.css': ['/css/style.css']
        },
      },
    },

    csso: {
      dist: {
        options: {
          report: 'gzip',
        },
        files: {
          '/css/style.min.css': ['/css/style.css'],
        },
      },
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: [BUILD_DIR],
          livereload: true
        },
        dev: {
          options: {
            middleware: function (connect) {
              return [
                require('connect-livereload')()
              ];
            }
          }
        }
      }
    },

    open: {
      delayed: {
        path: 'http://amcore.local'
      }
    },

    watch: {
      javascriptDev: {
        files: ['/js/src/*.js'],
        tasks: ['concat:dev', 'uglify:production', 'notify:uglify'],
        options: {
          livereload: false
        }
      },

      css: {
        files: [
          '/scss/**/*'
        ],
        // Run Sass, autoprefixer, and CSSO
        tasks: ['sass', 'autoprefixer', 'remfallback', 'csso', 'notify:sass'],
        options: {
          interrupt: true,
          spawn: false,
          livereload: true
        },
      },

      images: {
        files: [
          '/images/**/*'
        ],
        tasks: ['svgmin', 'svg2png', 'svgstore'],
        options: {
          interrupt: true,
          spawn: false,
        },
      },

      // Live reload files
      livereload: {
        options: { livereload: true },
        files: [
        '/css/**/*.css',
        '**/*.html',
        '/js/*.js',
        ]
      },

    }


  });

  // Default Task
  grunt.registerTask('default', ['sass', 'autoprefixer', 'remfallback', 'csso', 'concat:dev', 'uglify:production', 'connect', 'open', 'notify', 'watch']);

};
