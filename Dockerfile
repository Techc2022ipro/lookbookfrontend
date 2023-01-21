FROM node:14
WORKDIR /app
COPY ./app .
COPY ./scripts/ /scripts
RUN chmod +x /scripts/*
EXPOSE 3000
ENTRYPOINT ["/scripts/entrypoint.sh"]
