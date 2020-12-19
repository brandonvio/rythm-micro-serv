aws ecr delete-repository --repository-name rythm-svc-price --force
aws ecr delete-repository --repository-name rythm-svc-socketio --force
cd rythm-svc-cdk
cdk destroy "*" --force