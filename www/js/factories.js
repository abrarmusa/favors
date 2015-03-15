app.factory("auth",function($state, $timeout, FirebaseApi){
  var user;
  return {

    getUser: function(email, password){
      var usercopy = ({
        email: email,
        password: password
      });
      FirebaseApi.getUser(email).then(function(recuser){
        if (user != "no user found"){
          if (recuser.password == usercopy.password){
            var user = recuser;
            $state.go('main');
          } else {
            alert("Incorrect Password")
          }
        } else {
          alert("User not found");
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
      $state.go('login');
    }
  }
})