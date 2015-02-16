'use strict';

// Description
exports.description = 'This grunt-init template will create the scaffolding and Gruntfile for a simple site.';

// Let us know what's about to happen
exports.notes = 'This grunt-init template will create the scaffolding and Gruntfile for a simple site.\nIncludes Sass, jQuery, some rem fallbacks, and other useful stuff.\n';

// Template-specific notes to be displayed after question prompts.
exports.after = "Just about done here.\n" +
                "You should run `npm install` to finish up.\nThen, run `grunt` and start working.\n";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function (grunt, init, done) {

  // init.process(options, prompts, done)
  init.process({ }, [
      init.prompt('name'),
      init.prompt('description'),
      init.prompt('version', '0.1.0'),
      init.prompt('author_name'),
      init.prompt('author_email'),
      init.prompt('author_url')
    ], function(err, props){

      // Directory for bower components, no trailing slash!
      props.pathToBower = 'assets/vendor';

      props.keywords = [];

      props.devDependencies = {
        "grunt": "~0.4.2",
        "grunt-autoprefixer": "~0.4.0",
        "grunt-sass": "~0.18.0",
        "grunt-contrib-watch": "~0.5.3",
        "grunt-contrib-concat": "~0.4.0",
        "grunt-contrib-uglify": "~0.4.0",
        "grunt-csso": "~0.7.0",
        "grunt-contrib-connect": "*",
        "connect-livereload": "*",
        "grunt-notify": "^0.4.1",
        "grunt-open": "^0.2.3",
        "grunt-svgmin": "~0.3.0",
        "grunt-svgstore": "^0.4.1",
        "grunt-remfallback": "~0.0.5",
        "matchdep": "^0.3.0"
      };

      // Write package.json
      init.writePackageJSON('package.json', props, function(pkg, props){
        if('scripts' in props) {
          pkg.scripts = props.scripts;
        }

        return pkg;
      });

      // Write bower.json file.
      // init.writePackageJSON('bower.json', {
      //   name: props.name,
      //   version: props.version,
      //   ignore: [
      //     '**/.*',
      //     'node_modules'
      //   ],
      //   dependencies: {
      //     'jquery': '~2.0.3'
      //   }
      // });

      // Files to copy (and process).
      var files = init.filesToCopy(props);

      // Add properly-named license files.
      //init.addLicenseFiles(files, props.licenses);

      // Actually copy (and process) files.
      init.copyAndProcess(files, props);

      // All done!
      done();
    });
};
