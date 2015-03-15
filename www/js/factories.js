app.factory("auth",function($state, $timeout){
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
      user = addUser(newuser);
      $state.go('tutorial');
    }
  }
})