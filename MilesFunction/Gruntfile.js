/**
 * @author Salsa
 */

module.exports = function(grunt) {

    grunt.initConfig({
      jshint: {
        all: ['index.js']
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
};