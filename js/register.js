
function check(form) {

var newname=form.name.value
var newpass=form.pass.value
var newphone=form.phone.value
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var attributeList = [];

var dataEmail = {
    Name : 'email',
    Value : newname // your email here
};
var dataPhoneNumber = {
    Name : 'phone_number',
    Value : newphone // your phone number here with +country code and no delimiters in front
};
var attributeEmail =
new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
var attributePhoneNumber =
new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

attributeList.push(attributeEmail);
attributeList.push(attributePhoneNumber);

var cognitoUser;
userPool.signUp(newname, newpass, attributeList, null, function(err, result){
    if (err) {
        alert(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    document.getElementById("newusername").innerHTML =  cognitoUser.getUsername()+" registered sucessfully"

});
};
