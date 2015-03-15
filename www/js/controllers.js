app.controller('SignupCtrl', function($scope, $ionicModal, auth, $q) {
  // No need for testing data anymore
  $scope.users = [];

  // var promise = $q(function(resolve, reject) {
  //   setTimeout(function()
  //   {
  //     resolve('This is my data');
  //   }, 5000);
  // });

  // promise.then(function(response) {
  //   alert('success: ' + response);
  // });

  // promise.fail(function(response) {
  //   alert('error: ' + response);
  // });

  // promise.always(function(response) {
  //   alert('always: ' + response);
  // });

  // Called when the form is submitted
  $scope.createUser = auth.createUser;

  $scope.checkUser = function() {
  console.log('User stored as ', auth.getUser()); 
  }

  // Open our new task modal
  $scope.newUser = function() {
    $scope.userModal.show();
  };

  // Close the new task modal
  $scope.closeNewUser = function() {
    $scope.userModal.hide();
  };
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


.controller('LoginController', function() {


})
