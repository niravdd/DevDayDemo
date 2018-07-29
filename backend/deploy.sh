#!/bin/bash
poolid=`aws cognito-idp create-user-pool --cli-input-json file://./cognito-user-pool.json --query "UserPool.Id" --out text --profile root`
cat cognito-user-pool-app.json | sed "s/addthis/$poolid/g" > myapp.json
clientid=`aws cognito-idp create-user-pool-client --cli-input-json file://./myapp.json --query "UserPoolClient.ClientId" --out text --profile root`
aws cognito-idp create-user-pool-domain --domain deadpool --user-pool-id $poolid --profile root
 
echo "poolid: "$poolid
echo "clientid: "$clientid
