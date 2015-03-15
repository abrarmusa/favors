app.factory("auth",function($state, $timeout, FirebaseApi){
  var user;
  return {
    getUser: function(){
      return user
    },
    createUser: function(firstName, lastName, password, email) {
      var newuser = ({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
      });
      user = FirebaseApi.addUser(newuser);
      $state.go('tutorial');
    }
  }
})