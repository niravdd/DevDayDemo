//start check existing session
const sIdToken = localStorage.getItem('token');
const sAccessToken = localStorage.getItem('accesstoken');
const sRefreshToken = localStorage.getItem('refreshtoken');
const susername = localStorage.getItem('username');

const sessionData = {
    IdToken: sIdToken,
    AccessToken: sAccessToken,
    RefreshToken: sRefreshToken
  };
console.log('cached username:',susername);
console.log('cached sessionData:',sessionData);
if (susername != null) {

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var userData = {
    Username : susername,
    Pool : userPool
};
var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

var cognitoUser = userPool.getCurrentUser();

   if (cognitoUser != null) {
       cognitoUser.getSession(function(err, session) {
           if (err) {
               console.log(err);
               return;
           }
           console.log('session validity: ' + session.isValid());
           console.log('session token: ',session.idToken.jwtToken);
           localStorage.setItem('token',session.idToken.jwtToken);
//refreshToken

           window.location = "./mylist.html";  //proceed to app.
       });
   }

}
//end check existing session




function check(form) {

var name=form.name.value
var pass=form.pass.value
if (name!=null && name!="")	{	if (pass != null && pass != "")
{		            document.getElementById("creds").innerHTML = "<p>checking... " + name +"</p>";				}									}


var authenticationData = {
    Username : name,
    Password : pass,
};
var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var userData = {
    Username : name,
    Pool : userPool
};



var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
       document.getElementById("creds").innerHTML = "username:"+ name ;
       localStorage.setItem('token', result.idToken.jwtToken);
       localStorage.setItem('accesstoken', result.accessToken.jwtToken);
       localStorage.setItem('refreshtoken', result.refreshToken.token);
       localStorage.setItem('username', name);

       console.log('idtoken:',localStorage.getItem('token'));
       console.log('accesstoken:',localStorage.getItem('accesstoken'));
       console.log('refreshtoken:',localStorage.getItem('refreshtoken'));
       window.location = "./mylist.html"
       },

    onFailure: function(err) {
        alert(err);

    },

    newPasswordRequired: function(userAttributes, requiredAttributes) {

        // the api doesn't accept this field back
        delete userAttributes.email_verified;
        delete userAttributes.phone_number_verified;
        var newpass = prompt("Enter a new password:","");
        cognitoUser.completeNewPasswordChallenge(newpass, userAttributes, this);
        }
});
}
