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
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'source/**/*.js', 'source/**/*.tpl.html'],
        tasks: ['html2js', 'concat'],
      },
      less: {
        files: 'source/**/*.less',
        tasks: ['less'],
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['html2js', 'concat', 'less']); 
};