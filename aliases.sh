alias down="docker-compose down"
alias up="docker-compose build;
	  docker-compose up -d && docker-compose logs -f"
alias bash="docker exec -it loginFrontend /bin/bash"
alias log="docker logs -n until=10s loginFrontend"
alias build="docker-compose build"
