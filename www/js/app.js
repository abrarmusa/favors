// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('favors', ['ionic'])
// ROUTERS
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  
  $stateProvider.state('tutorial', {
    url: '/tutorial',
    views: {
      tutorial: {
        templateUrl: 'templates/tutorial.html'
      }
    }
  })

  $stateProvider.state('login', {
    url: '/login',
    views: {
      login: {
        templateUrl: 'templates/login.html'
      }
    }
  })

  $stateProvider.state('signup', {
    url: '/signup',
    views: {
      signup: {
        templateUrl: 'templates/signup.html'
      }
    }
  })

})


.run(function($ionicPlatform) {
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
})





