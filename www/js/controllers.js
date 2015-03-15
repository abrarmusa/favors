app.controller('SignupCtrl', function($scope, $location, $state, auth) {
  // No need for testing data anymore
  // $scope.users = [];

  // // Called when the form is submitted

  $scope.createUser = auth.createUser;
  $scope.goToMain = function() {
    $state.go('main');
  }

})

app.controller('LoginController', function($scope, $location, $state, auth) {

  $scope.go = function(path) {
    $state.go(path)
  }

  $scope.loginUser = auth.loginUser;

})


app.controller('MainController', function($scope, $ionicSideMenuDelegate) {
  var cardTypes = [
    { image: 'img/favorsname.png' },
    { image: 'img/formlogo.png' },
    { image: 'img/job.png'}
  ];

  $scope.cards = [];

  $scope.addCard = function(i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }
 
    for(var i = 0; i < 3; i++) $scope.addCard();
 
    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    }
 
    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    }
 
    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    }
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  $scope.go = function(path) {
    $state.go(path);
  }

})

// CONTROLLERS
app.controller('SlideController', function($scope, $ionicSlideBoxDelegate, $document, auth, $state, $location) {

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

app.controller('FooController', function($scope, FirebaseApi){
    FirebaseApi.getJobsByTag(["Gardening", "Fencing"]).then(function(jobs){
      console.log(jobs);
    });
    
    FirebaseApi.getJobsById([502147, 611472, 763081]).then(function(jobs){
      console.log(jobs);
    });

    FirebaseApi.getUsersById([224205, 305, 346783]).then(function(users){
        console.log(users);
    });
    FirebaseApi.acceptUserForJob(965294, 546046); // accept user 546046 for job id 965294  
    FirebaseApi.getUser("fe@goenu.io").then(function(user) {

    FirebaseApi.applyForJob(987125, 224205, printSpotNumber(Object));
      console.log(user);
    });
    console.log(FirebaseApi.addUser({"firstName" : "John", "lastName" : "Doe", "email" : "johnDoe@gmail.com", "linkedInURL" : "www.linkedin.com/JOhnny"}));
    console.log(FirebaseApi.addJob({"description" : "Build my house for me.", "creatorUserId" : 101, "spotsAvailable" : 5}));

})

// This is the comment handler for applyForJob()
/*
 function printSpotNumber(Object) {
    console.log(Object["spotsAvailable"]);
 }
 */



