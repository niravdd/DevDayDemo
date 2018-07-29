function check(form) {

var clientcode=form.clientcode.value
var name=form.name.value
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var userData = { Username : name,
                  Pool : userPool };

var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

cognitoUser.confirmRegistration(clientcode, true, function(err, result) {
    if (err) {
        alert(err);
        return;
    }
    console.log('call result: ' + result);
    document.getElementById("confirmnewuser").innerHTML = result; //replace HTML on page

});
};
