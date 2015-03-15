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
      console.log('resp:', user);
    },
    /**
     * Require a controller to be authenticated, or send visitor to
     * another state.
     */
    required: function() {
      if (!user) {
        $timeout(function() {
         $state.go('login');
        });
      }
    }
  }
})