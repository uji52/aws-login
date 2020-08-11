echo "Please input aws account id (e.x. 520052005200"
printf "> "
read ACCOUNT_ID

sed "s/ACCOUNT_ID/"$ACCOUNT_ID"/" json/template/AWSLogin.json > json/AWSLogin.json
sed "s/ACCOUNT_ID/"$ACCOUNT_ID"/" json/template/AWSLoginRoleTrustPolicy.json > json/AWSLoginRoleTrustPolicy.json

aws iam create-policy --policy-name AWSLoginPolicy --policy-document file://json/AWSLoginPolicy.json
aws iam create-role --role-name AWSLoginRole --assume-role-policy-document file://json/AWSLoginRoleTrustPolicy.json
aws iam attach-role-policy --role-name AWSLoginRole --policy-arn "arn:aws:iam::"$ACCOUNT_ID":policy/AWSLoginPolicy"
