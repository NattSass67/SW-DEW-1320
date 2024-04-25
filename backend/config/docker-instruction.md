## This command will list all containers, both running and stopped.
docker ps -a 

## if the container's name is my-container, you can delete it using:
docker rm my-container 
docker rm <container_id>

## to delete volume
docker volume rm <volume_name>

## to check vloume name
docker volume ls



## -------------------------------------------------
docker compose for postgres
## -------------------------------------------------

version: '3.8'

services:
  postgres:
    image: postgres:latest
    container_name: my-postgres-container
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5433:5432"
    volumes:
      - ./pgdata:/var/lib/postgresql/data  # Bind mount to host directory or use pgdata:/var/lib/postgresql/data to see the different

volumes:
  pgdata:  # Optional: Define a named volume if needed by other services

  # foward 5433 localhost to 5432 docker
  # /var/lib/postgresql/data is a path within the PostgreSQL container. It's the default data directory where PostgreSQL stores its databases
  # path inside container(inside-docker) and localhost machine(your-pc) are not the same

  # The configuration ./pgdata:/var/lib/postgresql/data uses a bind mount to map the pgdata directory from your localhost to the /var/lib/postgresql/data directory within the PostgreSQL container.