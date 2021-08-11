# Disability Wiki Project
## Project Members : 

>**Pierre Maret** (Professor)

>**Christo El Morr** (Ast. Professor )

>**Rachel da Silveira Gorman** (Ast. Professor )

>**Fabrice MUHLENBACH** (Ast. Professor )

>**Alexandra Creighton** (PhD Candidate)

>**Rediet Tadesse** (MSc Student)

>**Bushra Kundi** (MSc Student)

>**Dhayananth Dharmalingam** (MSc Student)


## Project Overview 
 Promote the convention and information about disability rights and articles relating experiences from different countries.

## About the Project

The data behind this project is free, open-source linked data that is mainted in **Wikibase** Project:([disabiilty wiki](https://disabilitywiki.univ-st-etienne.fr/wiki/Main_Page)) .
It promotes information about disability rights.

# Application overview 
The application is develoepd using `REACT 17` framework by following front-end architecture. 
 ### Application directory
    .
    ├── src/
    │   ├── admin-site/        # Admin website       
    │   │   ├── layouts/       # Reusable layouts 
    │   │   ├── pages/         # Pages   
    │   │   ├── AdminView.JS/  # Main component with router outlet    
    │   │   └── ...       
    │   ├── pub-website/       # Public website 
    │   │   ├── components/    # Reusable components 
    │   │   ├── pages/         # Pages
    │   │   ├── MainView.JS/   # Main component with router outlet    
    │   │   └── ...   
    │   ├── config/
    │   │    ├── PrivateRoute.js         # Secured route config
    │   │    ├── PrivateRouteAdmin.js    # Secured admin route config 
    │   │    ├── Routes.js               # App route config 
    │   └── ...  
    │   ├── data/                   # Static JSON files are stored in this directory
    │   ├── services/               # API service files
    │   └── ...  
    ├── env.development             # dev only environment variables
    ├── env.production              # production environment variables
    └── ...

    
> ## **DETAIL**
>
> `admin-site/` 
>   
> This directory contains all layouts and pages of contributors website. `layout/` directory contains sidebar and pdf viewer components which is shared accross different components. 
>
> `AdminView.js` 
>   
> Main router outlet component of registered user web-site. Route navigations are configured in this component. 
>
> `pub-website/` 
>   
> This directory contains all components and pages of public website. `components/` directory contains reusable components and `pages/` directory contains all the pages of public website. 
>
> `MainView.js` 
>   
> Main router outlet component of public web-site. Route navigations are configured in this component. 
>
> `config/` 
>   
> Route configurations are presented in this directory. `Route.js` define basic unsecured routes of the application. `PrivateRoute.js` define secured routes. `PrivateRouteAdmin.js` define routes only accessible by admin user of the platform.   
>
> `data/` 
>   
> Static json files are stored in this directory. eg: language.json, country.json
>
> `service/` 
>   
> All API service classes are stored in this directory. `AuthService.js` contains authentication and login service calls. `QAService.js` contains QAnswer service calls. `DisWikiAPI.js` contains disability wiki web server service calls.    
>
> `env [env.development, env.production]` 
>   
> Different environment files are configured in the root directory. `env.development` variables will be used when running application with dev server (`npm start run`). `env.production` variables are used with produciton build (`npm build --prod`) 
>
The detail overview and the implementation of this Project is described `report.pdf` file in our repository.

## **Deployment**
>
> `1. Configure NGINX server` 
>   
> Set a redirection to the web service from nginx reverse proxy server. Add the following settings in /etc/nginx/sites-enabled/default. 
>>  ```php
>>  server{
>>      listen 3000 default server;
>>      listen [::]3000 default server;
>>      root /home/dd07078u/web-application/front-app;
>>      index index.html index.htm index.nginx-debian.html;
>>      server_name _;
>>      location / {
>>		# important for react. otherwise refresh will break the app
>>		    try_files $uri /index.html;
>>      }
>> }  
>>  ``` 
>
> `2. Copy production build to host directory` 
>   
> Run production build inside root directory in React application.
>>  ```bash
>>     npm run build --prod
>>  ``` 
> copy all contents from `/build` directory to the host directory 
>
> `3. Restart NGINX server` 
>   
> Validate the configuration file and restart the nginx server.
>>  ```bash
>>     sudo nginx -t //check is configuration is error free
>>     sudo service nginx restart
>>     sudo service nginx status
>>  ``` 
> copy all contents from `/build` directory to the host directory 
>


#### NOTE!!!
Please refer `report.pdf` for more information. 

## Stack
* Python 3
* Flask-RestPlus
* React JS- V-17.0.2
* RabbitMQ 
* MySQL 



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## REACT -Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
