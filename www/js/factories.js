app.factory("auth",function(){
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
      console.log(user);
  }
  }
})