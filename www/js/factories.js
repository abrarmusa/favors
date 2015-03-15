app.factory("auth",function($state, $timeout, FirebaseApi){
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
            alert("User logged in");
            alert(user.userId);
          } else {
            alert("Incorrect password");
          }
        } else {
          alert("User not found");
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

