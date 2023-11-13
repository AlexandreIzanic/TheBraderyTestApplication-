# TheBraderyTestApplication

>This project is a basic React app ecommerce with cart and stock management, 

**Technology Stack:** React, Express, Mysql

To run this app, you need a mySQL database, and a Stripe Account.

## Connect DataBase
In backend folder, create a file .env
and put value of your database : 

```
PORT =

MYSQL_HOST= 
MYSQL_PORT= 
MYSQL_USER= 
MYSQL_PASSWORD= 
MYSQL_DATABASE= 
```


### Create similar database
Get SQL File in root directory




 ## Stripe Connection
 Create a Stripe account and add these value in .env
 
 ```
STRIPE_PUBLISHABLE_TEST = 
STRIPE_SECRET_TEST = 
```
>Find these key in dev => Key Api


 If server is not hosted, u need config local web endpoint in Stripe

 ### How config Stripe web endpoint
 - Dev => Webhooks
 - Add Local Listener
 - In Powershell, and Stripe CLI
     - ```stripe login```
     - ```stripe listen --forward-to localhost:PORT/stripe/webhook```

  where PORT is port of server.

 command stripe listen give you a  "webhook signing secret"

 **Put into .env**
```
STRIPE_ENDPOINT_SECRET =
```

  
## How run Application
 ### Install dependencies :
 ```npm install```
 ### Start Server
 
 -backend :```npm run dev```
 
 -frontend : ```npm run start```


**if you want change PORT of server**
- .env => PORT

- /frontend/index.js => axios.defaults.baseURL 


 
 ## License

[MIT](https://choosealicense.com/licenses/mit/)
