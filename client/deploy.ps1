# create stack
Write-Output "delete stack"
aws cloudformation delete-stack --stack-name MyS3Website
Wait-CFNStack -StackName MyStack -Status DELETE_COMPLETE

aws cloudformation create-stack --template-body file://s3-static-website.yaml --stack-name MyS3Website

#wait for stack created completely
Wait-CFNStack -StackName MyS3Website -Status CREATE_COMPLETE

#upload file to S3
$path = Join-Path $PWD.Path "build"
aws s3 cp $path s3://premiumproductonline.com/ --recursive

#sync s3 to other s3
Write-Output "sync to other s3"
aws s3 sync s3://premiumproductonline.com/ s3://www.premiumproductonline.com/