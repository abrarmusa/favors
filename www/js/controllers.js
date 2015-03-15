app.controller('SignupCtrl', function($scope, $ionicModal, auth, $q) {
  // No need for testing data anymore
  $scope.users = [];

  // Called when the form is submitted
  $scope.createUser = auth.createUser;

})

app.controller('LoginController', function($scope, $location, $state) {

  $scope.goToTutorial = function() {
    $state.go('tutorial');
  }

  
})

// CONTROLLERS
.controller('SlideController', function($scope, $ionicSlideBoxDelegate, $document, auth) {
  $scope.myActiveSlide = 0;

  $scope.slideChanged = function(index) {
    var slides = $ionicSlideBoxDelegate.slidesCount();
    var increment = $document[0].getElementsByClassName('increment');
    increment[0].style.width = (1+19*index/(slides-1))*5+'%';
  }; 

})

