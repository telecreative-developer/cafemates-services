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


# Config Nginx


`server {`

  `listen 80 default_server;`
  
  `listen [::]:80 default_server;`
  
  `server_name xx.xx.xx.xxxxx;`
  
  `location / {`
  
    try_files $uri $uri/ =404;
  
  `}`
  
  `location /services_name/ {`
  
        proxy_set_header X-Real-IP $remote_addr;
        
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        proxy_set_header Host $http_host;
        
        proxy_set_header X-NginX-Proxy true;
        
        proxy_pass http://127.0.0.1:${port_services}/;
        
        proxy_redirect off;
        
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        
        proxy_set_header Connection "upgrade";
        
        proxy_redirect off;
        
        proxy_set_header   X-Forwarded-Proto $scheme;

`}`


# Running
running using PM2

[PM2 Docs](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

# Built With
* Express js 4.16.0

# Versioning API
1.0 (15 May 2018)
