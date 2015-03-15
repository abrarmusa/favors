// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('favors', ['ionic'])
// ROUTERS


app.run(function($ionicPlatform, $rootScope, auth, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

   $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.authRequired && !auth.getUser()) {
      $state.go('login', {}, {reload: true});
      e.preventDefault();
    }
  });
})


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('tutorial', {
    url: '/tutorial',
    authRequired: true,
    views: {
      'tutorial': {
        templateUrl: 'templates/tutorial.html',
        controller: 'SlideController'
      }
    }
  })
  .state('login', {
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      }
    }
  })
  .state('signup', {
    url: '/signup',
    views: {
      'signup': {
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login')

})






