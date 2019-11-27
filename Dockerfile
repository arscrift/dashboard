FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY default /etc/nginx/sites-available/
COPY . /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]