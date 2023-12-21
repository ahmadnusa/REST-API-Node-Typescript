## REST API with NodeJS with TypeScript

### Description
This project is a RESTful API built using NodeJS with TypeScript. The primary objective is to provide CRUD (Create, Read, Update, Delete) operations for products stored in a MongoDB database. Additionally, the project incorporates user authentication using JWT (JSON Web Token) to ensure security and authorization for accessing the API.

### Key Features

1. **CRUD Product**:
    - **Create**: Add a new product to the database.
    - **Read**: Fetch a list of products or retrieve product details based on ID.
    - **Update**: Modify product information based on the given ID.
    - **Delete**: Remove a product based on the provided ID.

2. **User Authentication**:
    - **Register**: Endpoint for registering new users into the system.
    - **Login**: Endpoint for user authentication. Upon successful login, users receive a JWT token for accessing other endpoints.
    - **Refresh**: Endpoint to refresh an expired access token.

### Using the API
This API has been deployed using Vercel. You can access the deployed API via the following link: [API Product Endpoint](https://api-product-sigma.vercel.app/).

#### Authentication Endpoints (/auth):

- **POST `/register`**:
    - Use this endpoint to register a new user. Users need to provide details such as email and password for registration.

- **POST `/login`**:
    - This endpoint is utilized for user authentication. After successful login, users obtain a JWT token for accessing other endpoints.

- **POST `/refresh`**:
    - If a user's access token has expired, they can use this endpoint to refresh the access token without needing to log in again.

#### Product Endpoints (/product):

- **GET `/`**:
    - Returns a list of all products stored in the database.

- **GET `/:id`**:
    - Retrieves product details based on the provided ID.

- **POST `/`**:
    - Accessible only by an admin. Used to add a new product to the database.

- **PUT `/:id`**:
    - Accessible only by an admin. Modifies product information based on the provided ID.

- **DELETE `/:id`**:
    - Accessible only by an admin. Deletes a product based on the given ID.

**Note**: 
- For certain endpoints under `/product`, there is a `requireAdmin` middleware ensuring only administrators can access them.
