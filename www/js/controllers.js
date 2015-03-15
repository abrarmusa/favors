app.controller('SignupCtrl', function($scope, $location, $state, auth) {
  // No need for testing data anymore
  // $scope.users = [];

  // // Called when the form is submitted
  $scope.createUser = auth.createUser;

  $scope.getUser = auth.getUser;
  
  $scope.goToMain = function() {
    $state.go('main');
  }

})

app.controller('LoginController', function($scope, $location, $state) {

  $scope.goToTutorial = function() {
    $state.go('tutorial');
  }


  $scope.goToMain = function() {
    $state.go('main');
  }
  
})

// CONTROLLERS
.controller('SlideController', function($scope, $ionicSlideBoxDelegate, $document, auth, $state, $location) {

  $scope.myActiveSlide = 0;

  $scope.slideChanged = function(index) {
    var slides = $ionicSlideBoxDelegate.slidesCount();
    var increment = $document[0].getElementsByClassName('increment');
    increment[0].style.width = (1+19*index/(slides-1))*5+'%';
  }; 

  $scope.goToSignup = function(){
    $state.go('signup');
  };



})

.controller('FooController', function($scope, FirebaseApi){
    FirebaseApi.getUser("fsdfsdfsdfe@goenu.io").then(function(user) {
    console.log(user);
    });
    console.log(FirebaseApi.addUser({"firstName" : "John", "lastName" : "Doe", "email" : "johnDoe@gmail.com", "linkedInURL" : "www.linkedin.com/JOhnny"}));
    console.log(FirebaseApi.addJob({"description" : "Build my house for me.", "creatorUserId" : 101, "spotsAvailable" : 5}));
})

