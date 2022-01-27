name="grakn-2.0"
fngrakn="cosmos.grakn"
fnschema="cosmos.gql"
address="./"
schemaname="cosmos"
cmdfn="grakn-commands"

docker pull graknlabs/grakn:2.0.0-alpha-9

docker run --name $name -d -v $(pwd)/db/:/grakn-core-all-linux/server/db/ -p 1729:1729 graknlabs/grakn:2.0.0-alpha-9
#docker cp $address$fngrakn $name:/opt/grakn-core-all-linux
docker cp $address$fnschema $name:/opt/grakn-core-all-linux
docker cp $address$cmdfn $name:/opt/grakn-core-all-linux

docker exec -it $name ./grakn server
docker exec -it $name ./grakn console --command="database create $schemaname"
docker exec -it $name ./grakn console --script=$cmdfn
#docker exec -it $name ./grakn server import $schemaname /opt/grakn-core-all-linux/$fngrakn
