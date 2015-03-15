var jobRef = new Firebase('brilliant-heat-2461.firebaseIO.com/jobs');
var userRef = new Firebase('brilliant-heat-2461.firebaseIO.com/users');
angular.module('firebase.api', [])

.factory('FirebaseApi', function($q) {
  return {
    addUser: function(userJson){
      var userId = (userJson["userId"] == undefined) ? generateRandomUserId() : userJson["userId"];
      var firstName = (userJson["firstName"] == undefined) ? chance.first() : userJson["firstName"];
      var lastName = (userJson["lastName"] == undefined) ? chance.last() : userJson["lastName"];
      var email = (userJson["email"] == undefined) ? chance.email() : userJson["email"];
      var password = (userJson["password"] == undefined) ? chance.word() : userJson["password"];
      var linkedInURL = (userJson["linkedInURL"] == undefined) ? "www.linkedin.com/"+firstName : userJson["linkedInURL"];
      var teachingRating = 0;
      var participantRating = 0;
      var teachingJobs = [];
      var participantJobs = [];
      var userJson = {"userId" : userId , "firstName" : firstName, "lastName" : lastName, "email" : email, "password" : password, "linkedInURL" : linkedInURL, "teachingRating" : teachingRating, "participantRating" : participantRating, "teachingJobs" : teachingJobs, "participantJobs" : participantJobs};

      userRef.push(userJson);
      return userJson;
    },
    addJob: function(jobJson){
      var jobId = generateRandomJobId();
      var description = (jobJson["description"] == undefined) ? chance.sentence({words: 10}) : jobJson["description"];
      var creatorUserId = (jobJson["creatorUserId"] == undefined) ? generateRandomUserId() : jobJson["creatorUserId"];
      var spotsAvailable = (jobJson["spotsAvailable"] == undefined) ? chance.integer({min: 1, max: 5}) : jobJson["spotsAvailable"];
      var spotUserIds = [];
      var pendingSpotIds = [];
      var jobJson = {"jobId" : jobId , "description" : description, "creatorUserId" : creatorUserId, "spotsAvailable" : spotsAvailable, "spotUserIds" : spotUserIds, "pendingSpotIds" : pendingSpotIds};
  
      jobRef.push(jobJson);

      userRef.once("value", function(snap) {
      addTeachingJobToUser(snap.val(), jobId, creatorUserId);
      });    
    return jobJson;
    },

  // @acceptedUserId: the userId we are accepting to participate in jobId
  // @jobId: the jobId we are granting acceptance to acceptedUserId
  acceptUserForJob: function (jobId, acceptedUserId){
    jobRef.once("value", function(snap) {
      jobArray = snap.val();
      for (var jobHash in jobArray){ // iterate over jobs
        var iteratedJobId = jobArray[jobHash]["jobId"];
        if (iteratedJobId == jobId){ // found the matching job
          console.log("FOUND JOB WITH JOB ID");
          var pendingSpotIds = jobArray[jobHash]["pendingSpotIds"];
          if (pendingSpotIds != undefined){ // pendingSpotIds contains things
            console.log("LOOKING AT PENDING ID");
            for (var i = 0; i < pendingSpotIds.length; i++){ // iterate over pending spot ids
              if (pendingSpotIds[i] == acceptedUserId){ // found a match in pending list
                if (i > -1) { // array bounds check
                  console.log("SPLICING "+i);
                  pendingSpotIds.splice(i, 1);
                  console.log(pendingSpotIds);
                  var jobRefHash = new Firebase('brilliant-heat-2461.firebaseIO.com/jobs/'+jobHash);
                  jobRefHash.update({"pendingSpotIds": pendingSpotIds});
                  var spotUserIds = jobArray[jobHash]["spotUserIds"];
                  if (spotUserIds == undefined){ // empty spotUserId
                    jobRefHash.update({"spotUserIds": [acceptedUserId]});
                  }
                  else{
                    spotUserIds.push(acceptedUserId);
                    jobRefHash.update({"spotUserIds": spotUserIds});
                  }

                }
              }

            }
          }
        }
      }
    });
  },    

    // @returns: userObject if successful, "NULL" if no match found
    getUser: function(email){
      var scopeEmail = email;
      return $q(function(resolve, reject) {
        var email = scopeEmail;
        userRef.once("value", function(snap) {
          userArray = snap.val();
          for (var userHash in userArray){
            var userEmail = userArray[userHash]["email"];
            if (email.localeCompare(userEmail) == 0){
              resolve(userArray[userHash]);
              return;
            }
          }
          resolve("NULL");
        });
      });
    }
  };
});

 function addTeachingJobToUser(userArray, jobId, creatorUserId){
    console.log(userArray);
    for (var userHash in userArray){
      var userId = userArray[userHash]["userId"];
      if (userId == undefined){
        continue;
      }
      else if (creatorUserId == userId){
        var userRef = new Firebase('brilliant-heat-2461.firebaseIO.com/users/' + userHash);
        var teachingJobs = userArray[userHash]["teachingJobs"];
        
        if (teachingJobs == undefined){
          userRef.update({"teachingJobs": [jobId]});
        }
        else{
          teachingJobs.push(jobId);
          userRef.update({"teachingJobs": teachingJobs});
        }
        console.log("Succesfully added jobId: " + jobId + " to userId: " + creatorUserId);
      }
    }
  }
