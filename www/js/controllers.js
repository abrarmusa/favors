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


app.controller('MainController', function($scope, $ionicSideMenuDelegate, $state, $location) {
  $scope.go = function(path) {
    $state.go(path);
  }
})

function addCardAsync(jobs, $scope, cardTypes){
  for (var i in jobs){
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.jobId = jobs[i]["jobId"];
    newCard.title = jobs[i]["description"];
    newCard.spotsAvailable = jobs[i]["spotsAvailable"];
    $scope.cards.push(angular.extend({}, newCard));
  }
}

app.controller('MainCardsController', function($scope, $ionicSideMenuDelegate, $state, $location, FirebaseApi, sharing, auth) {
 var cardTypes = [
    { image: 'img/favorsname.png' },
    { image: 'img/formlogo.png' },
    { image: 'img/job.png'}
  ];

  $scope.tags = sharing.sharedObject;
  $scope.cards = [];

  FirebaseApi.getJobsByTag($scope.tags).then(function(jobs){
    addCardAsync(jobs, $scope, cardTypes);
  });


 
  $scope.cardSwipedLeft = function(index) {
      console.log('Left swipe');
  }
 
  $scope.cardSwipedRight = function(index, jobId) {
      var user = auth.getUser();
      console.log('Right swipe');
      if (user != undefined){
        FirebaseApi.applyForJob(jobId, user.userId , function(changedJob, key){});
      }   
  }
 
  $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
      console.log('Card removed');
  }
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.goToHome = function(){
    $state.go('main');
  };
})

app.controller('MainJobsController', function($scope, $ionicSideMenuDelegate, $state, $location) {
    $scope.goToHome = function(){
    $state.go('main');
  };
})

app.controller('MainPendingController', function($scope, $ionicSideMenuDelegate, $state, $location) {
  $scope.goToHome = function(){
    $state.go('main');
  };
})

app.controller('TagsController', function($scope, $ionicSideMenuDelegate, $state, sharing) {

  $scope.tags = sharing.sharedObject;

  $scope.addTag = function(tag) {
    console.log($scope.tags);
    console.log(tag);
    if (!contains($scope.tags, tag)){
      $scope.tags.push(tag);
    }
    console.log("aease ",$scope.tags);
  }
  $scope.go = function(path) {
    $state.go(path);
  }

  $scope.goToHome = function(){
    $state.go('main');
  };

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
// key = key of the job that was changed
// Object =  Object that was changed
/*
 function printSpotNumber(Object, key) {
    console.log(Object);
    console.log(key);
 }
 */
 



