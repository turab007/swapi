FROM httpd:2.4
RUN mkdir -p /usr/local/apache2/htdocs
COPY ./dist/starwars /usr/local/apache2/htdocs/
RUN chown -R daemon:daemon /usr/local/apache2
