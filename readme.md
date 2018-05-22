# cafemates-services
Cafemates Services, Server Configuration

# Getting Started
clone poject
`git clone https://github.com/telecreative-developer/cafemates-services/`

# Requirements

* node v8.11.1 
* npm 5.6.0
* phyton
* postgresql
* pm2
* Nginx
* etc

# Installing
cd cafemates-services

bash package.sh

import database dbexport.pgsql

# Configuration Database
create file .env 

copy script from .env.example


# Config Nginx Microservices


`server {`

  `listen 80 default_server;`
  
  `listen [::]:80 default_server;`
  
  `server_name xx.xx.xx.xxxxx;`
  
  `location / {`
  
    try_files $uri $uri/ =404;
  
  `}`
  
  `location /services_name1/ {'
  
        proxy_pass http://127.0.0.1:${port_services1}/;
        //more config
        
  '}`
  
  `location /services_name2/ {`
  
        proxy_pass http://127.0.0.1:${port_services2}/;
        //more config
  `}`
  
`}`


# Running
running using PM2

[PM2 Docs](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

# Testing
http://xx.xx.xxxx/services_name/api/v1/services_name

# Built With
* Express js 4.16.0

# Versioning API
1.0 (15 May 2018)
