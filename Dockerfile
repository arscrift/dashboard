FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY default /etc/nginx/sites-available/
COPY nginx.conf /etc/nginx/
COPY . /usr/share/nginx/html
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]