app.factory("auth",function($state, $timeout, FirebaseApi, $ionicPopup){
  var user;
  return {
    getUser: function(){
      return user
    },
    loginUser: function(email, password){
      FirebaseApi.getUser(email).then(function(recuser){
        if (recuser != "NULL"){
          if (recuser.password == password){
            user = recuser;
            $state.go('main');
            var myPopup = $ionicPopup.show({
              title: 'Enter Wi-Fi Password',
              subTitle: '<h1>You are logged in</h1>',
              buttons: [
                { text: 'Cancel' }
              ]
            });
            myPopup.then(function(res) {
              console.log('', res);
            });
            $timeout(function() {
               myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);
          } else {
            var myPopup = $ionicPopup.show({
              title: 'Enter Wi-Fi Password',
              subTitle: '<h1>Incorrect Password. Please try again</h1>',
              buttons: [
                { text: 'Cancel' }
              ]
            });
            myPopup.then(function(res) {
              console.log('', res);
            });
            $timeout(function() {
               myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);
          }
        } else {
            var myPopup = $ionicPopup.show({
              title: 'Enter Wi-Fi Password',
              subTitle: '<h1>You are not registered. Please sign up</h1>',
              buttons: [
                { text: 'Cancel' }
              ]
            });
            myPopup.then(function(res) {
              console.log('', res);
            });
            $timeout(function() {
               myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);
          $state.go('login');
        }
      })

    },

    createUser: function(firstName, lastName, password, email) {
      var newuser = ({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
      });
      user = FirebaseApi.addUser(newuser);
      $state.go('main');
    }
  }
})

app.factory("sharing", function(){

  return {sharedObject: ["Gardening"] }

});

