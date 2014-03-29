module.exports = function(config) {
  config.set({
    files : [
      'node_modules/chai/chai.js',
      'public/components/jquery/jquery.js',
      'public/components/angular/angular.js',
      'public/components/angular-animate/angular-animate.js',
      'public/components/angular-route/angular-route.js',
      'public/components/angular-mocks/angular-mocks.js',
      'public/components/underscore/underscore.js',
      'public/components/restangular/dist/restangular.js',
      'public/scripts/config.js',
      'public/scripts/features.articles.js',
      'public/scripts/app.js',
      'test/chai-init.js',
      'test/unit/angular/**/*.js'
    ],
    basePath: '../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};
