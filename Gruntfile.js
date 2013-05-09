module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef:  true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          console: true,
          XDomainRequest: true,
          XMLHttpRequest: true,
          module: true,
          define: true,
          require: true,
          exports: true
        }
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      tasks: 'default'
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '*   Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
        '*   Apache License' +
        '*/\n\n'
      },
      dist: {
        files: {
          'dist/geotriggers.min.js': ['src/**/*.js']
        }
      },
      versioned: {
        files: {
          'dist/versions/geotriggers-<%= pkg.version %>.min.js': ['src/**/*.js']
        }
      }
    },
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helpers.js'
      }
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: '.*Spec',
        helperNameMatcher: '.*Helpers',
        useHelpers: true
      },
      all: ['spec/']
    }
  });

  grunt.registerTask('default', ['jshint', 'jasmine', 'jasmine_node']);
  grunt.registerTask('build', ['default', 'uglify']);
  grunt.registerTask('test', ['jasmine_node','jasmine']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-node');

};