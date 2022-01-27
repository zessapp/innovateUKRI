from subprocess import Popen, PIPE
from time import sleep


def call_docker_command(command: str, log_message: str):
    print(log_message)

    process = Popen(command, stdin=PIPE, stdout=PIPE, stderr=PIPE, shell=True)

    # Wait a little for the docker command to run

    process.wait(5000)
    sleep(4)


def docker_run(container_name: str, port: int, docker_image: str):

    docker_run_command = f'[ ! "$(docker ps -a | grep {container_name})" ] && docker run --name {container_name} -d -v $(pwd)/db/:/grakn-core-all-linux/server/db/ -p 1729:{port} {docker_image}'
    call_docker_command(
        docker_run_command, f"Running the Docker container: {container_name}"
    )


def docker_start(container_name: str):
    docker_start_command = f'[ "$(docker ps -a | grep {container_name})" ] && docker container start {container_name}'
    call_docker_command(
        docker_start_command, f"Starting the Docker container: {container_name}"
    )


def init_docker(container_name: str, port: int, docker_image: str):
    docker_run(container_name, port, docker_image)
    docker_start(container_name)
