// Most of this is from: http://www.sitepoint.com/writing-awesome-build-script-grunt/
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    copy: {
      build: {
        cwd: 'src',
        src: [ '**', '!**/*.coffee', '!**/*.jade' ],
        dest: 'dist',
        expand: true
      },
      vendor: {
        cwd: 'vendor',
        src: [ 'jquery-2.1.4.min.js' ],
        dest: 'dist',
        expand: true
      },
    },

    clean: {
      build: {
        src: [ 'dist' ]
      },
      scripts: {
        src: [ 'dist/**/*.js', '!dist/jquery-freud.js', '!dist/jquery-freud.min.js', '!dist/jquery-2.1.4.min.js', '!dist/tests.js' ]
      },
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'src',
        src: [ '**/**.coffee' ],
        dest: 'dist',
        ext: '.js'
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'dist/jquery-freud.min.js': [ 'dist/jquery-freud.js' ]
        }
      }
    },

    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.jade' ],
          dest: 'dist',
          ext: '.html'
        }]
      }
    },

    watch: {
      scripts: {
        files: 'src/**/*.coffee',
        tasks: [ 'scripts' ]
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: [ 'jade' ]
      },
      copy: {
        files: [ 'src/**', '!src/**/*.coffee', '!src/**/*.jade' ],
        tasks: [ 'copy:build' ]
      },
      copy_vendor: {
        files: [ 'vendor/jquery-2.1.4.min.js' ],
        tasks: [ 'copy:vendor' ]
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: 'dist',
          hostname: '*'
        }
      }
    },

    jasmine : {
      src : 'dist/jquery-freud.js',
      options : {
        vendor: ['vendor/jquery-2.1.4.min.js'],
        specs : 'spec/**/*.js'
      }
    },
  });

  // Copy files in preparation of building
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Delete files and directories before and after building
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Compile coffeescript to js
  grunt.loadNpmTasks('grunt-contrib-coffee');
  // Minification of our js
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Template language used to build the development test page
  grunt.loadNpmTasks('grunt-contrib-jade');
  // Auto-run building for coffee and jade
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Static file web server for test page
  grunt.loadNpmTasks('grunt-contrib-connect');
  // Testing framework based on PhantomJS
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Task to build the plugin from coffeescript to javascript
  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files.',
    [ 'coffee', 'uglify', 'clean:scripts' ]
  );

  // The general build task including jade
  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the dist directory.',
    [ 'clean:build', 'copy:build', 'copy:vendor', 'scripts', 'jade' ]
  );

  // For running our tests
  grunt.registerTask('test', ['build', 'jasmine']);

  // Default task that runs watcher, dev server and watches for changes and compiles them.
  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'build', 'connect', 'watch' ]
  );
};
