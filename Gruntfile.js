module.exports = function(grunt) { 
  grunt.initConfig({
    html2js: {
      options: {
        base: 'source/js'
      },
      main: {
        src: ['source/**/*.tpl.html'],
        dest: 'public/build/templates.js'
      }
    },
    concat: {
      options: {},
      dist: {
        src: [
          'source/js/app.js',
          'source/js/**/*.js',
          'public/build/templates.js'
        ],
        dest: 'public/build/app-built.js'
      }
    },
    ngmin: {
      scripts: {
        src: ['public/build/app-built.js'],
        dest: 'public/build/app-built.js'
      }
    },
    uglify: {
      scripts: {
        files: {
          'public/build/app-built.js': ['public/build/app-built.js']
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['public/less'],
          yuicompress: false
        },
        files: {
          'public/build/app.css':'source/less/app.less'
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'server.js',
          port: process.env.PORT || 3000
        }
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'source/**/*.js', 'source/**/*.tpl.html'],
        tasks: ['html2js', 'concat']
      },
      less: {
        files: 'source/**/*.less',
        tasks: ['less']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify'); 
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['html2js', 'concat', 'less']);
  grunt.registerTask('prod', ['default', 'ngmin', 'uglify']);
  grunt.registerTask('server', ['default', 'express:dev', 'watch']);
};