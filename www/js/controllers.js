app.controller('SignupCtrl', function($scope, $location, $state, auth) {
  // No need for testing data anymore
  // $scope.users = [];

  // // Called when the form is submitted

  $scope.createUser = auth.createUser;
  

})

app.controller('LoginController', function($scope, $location, $state, auth) {

  $scope.go = function(path) {
    $state.go(path)
  }

  $scope.loginUser = auth.loginUser;

})

app.controller('MainController', function($scope, $ionicSideMenuDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq.jpeg' },
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

app.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});





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
    FirebaseApi.getUser("fe@goenu.io").then(function(user) {
    console.log(user);
    });
    console.log(FirebaseApi.addUser({"firstName" : "John", "lastName" : "Doe", "email" : "johnDoe@gmail.com", "linkedInURL" : "www.linkedin.com/JOhnny"}));
    console.log(FirebaseApi.addJob({"description" : "Build my house for me.", "creatorUserId" : 101, "spotsAvailable" : 5}));
})

