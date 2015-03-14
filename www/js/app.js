// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('favors', ['ionic'])
var userRef = new Firebase('brilliant-heat-2461.firebaseIO.com/users');
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

  $stateProvider.state('signup', {
  url: '/signup',
  views: {
    signup: {
      templateUrl: 'templates/signup.html'
    }
  }
})

})


app.run(function($ionicPlatform) {
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

// CONTROLLERS
app.controller('SlideController', function($scope, $ionicSlideBoxDelegate, $document) {
  $scope.myActiveSlide = 0;

  $scope.slideChanged = function(index) {
    var slides = $ionicSlideBoxDelegate.slidesCount();
    var increment = $document[0].getElementsByClassName('increment');
    increment[0].style.width = (1+19*index/(slides-1))*5+'%';
  }; 

})

.controller('SignupCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.users = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-user.html', function(modal) {
    $scope.userModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createUser = function(user) {

    userRef.push({
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email
    });

    $scope.userModal.hide();
  };

  // Open our new task modal
  $scope.newUser = function() {
    $scope.userModal.show();
  };

  // Close the new task modal
  $scope.closeNewUser = function() {
    $scope.userModal.hide();
  };
});