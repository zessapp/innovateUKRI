#!/bin/sh

# ls $DOCKER_GRAKN_HOME/typedb-all-linux-$VERSION/
# ln -s ./typedb /bin
./typedb server
echo "Container Running and server!"
tail -f /dev/null