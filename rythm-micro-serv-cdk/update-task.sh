ecsClusterName=RythmClusterUpdate

aws ecs list-tasks --cluster $ecsClusterName --desired-status RUNNING --family ${nameTaskDefinition} | egrep "task/" | sed -E "s/.*task\/(.*)\"/\1/"