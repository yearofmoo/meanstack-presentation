module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-env');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      options: {
        stdout: true
      },
      selenium: {
        command: './selenium/start',
        options: {
          stdout: false
        }
      },
      mongod: {
        command: 'mongod'
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: 'node ./node_modules/bower/bin/bower install'
      },
      protractor_install: {
        command: 'node ./node_modules/protractor/bin/install_selenium_standalone'
      },
    },

    mochaTest: {
      unit: {
        options : {
          reporter: 'dot'
        },
        src: ['test/unit/express/**/*.js']
      }
    },

    watch: {
      mocha_express_tests : {
        files: ['app/**/*.js', 'test/unit/express/**/*.js'],
        tasks: 'mochaTest:unit'
      },
      e2e_tests : {
        files: ['app/**/*.js', 'test/e2e/**/*.js'],
        tasks: 'protractor:auto'
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      }
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: "./test/protractor.conf.js"
      },
      singlerun: {},
      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit-angular.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './test/karma-unit-angular.conf.js',
        autoWatch: true,
        singleRun: false
      }
    }
  });

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('install', ['shell:npm_install', 'shell:protractor_install', 'update']);
  grunt.registerTask('update', ['shell:bower_install']);
  grunt.registerTask('dev', ['update','nodemon:dev']);
  grunt.registerTask('default', ['dev']);

  //Test task.
  grunt.registerTask('test', ['test:unit', 'test:express', 'test:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:express', ['env:test', 'mochaTest:unit']);
  grunt.registerTask('test:e2e', ['concurrent:e2e']);

  //Autotest task.
  grunt.registerTask('autotest', ['autotest:express']);
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);
  grunt.registerTask('autotest:express', ['env:test', 'mochaTest:unit', 'watch:mocha_express_tests']);
  grunt.registerTask('autotest:e2e', ['concurrent:e2e_auto']);
};
