# Use the base Typesense image with version 0.25.2
FROM typesense/typesense:0.25.2

# Set the working directory
COPY ./typesense-data/ /data
WORKDIR /app
EXPOSE 8108
CMD ["--data-dir", "/data", "--api-key=sahilcoder1", "--enable-cors"]
