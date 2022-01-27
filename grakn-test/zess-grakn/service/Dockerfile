FROM openjdk:11-jdk
FROM vaticle/typedb:2.3.3


ENV VERSION=2.3.3
ENV DOCKER_GRAKN_HOME=/typedb

# ADD https://github.com/vaticle/typedb/releases/download/${VERSION}/typedb-all-linux-${VERSION}.tar.gz /

# RUN tar -xvzf /typedb-all-linux-${VERSION}.tar.gz --strip-components=2

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 755 /docker-entrypoint.sh

# Grakn Server, Thrift client API, Grakn gRPC
EXPOSE 1729:1729

ENTRYPOINT ["/bin/bash", "/docker-entrypoint.sh"]
