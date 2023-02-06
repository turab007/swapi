# Starwars

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Run application locally

1. clone the project
2. Navigate to the project and run `npm install`.
3. Run `npm run start` to run the dev server. 
4. Navigate to `http://localhost:4200/` to see the running application.

## Run docker image

If you have docker installed then you can run the docker image by following these steps

1. Install docker image from `https://drive.google.com/file/d/1KsWZPBjom8qVCEJcoeY9M66QWnQjgcrq/view?usp=share_link`
2. Import docker image by running `docker load -i ./starwars.tar`
3. Then run `docker run --rm -d  -p 4202:80/tcp swapi`
3. Open `http://localhost:4202/` and the application would be running

