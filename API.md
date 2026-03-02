# 📑 GymBro API Documentation

Base URL: `http://localhost:3000/api`

## 🔐 Authentication
All requests require a Bearer Token in the `Authorization` header, obtained from Auth0. 
Example: `Authorization: Bearer <your_jwt_token>` **(TODO: implement)**

## 👤 User Endpoints

### 1. Get User by Auth0 ID
Check if a profile exists and retrieve it.
- **URL:** `/user/:auth0Id`
- **Method:** `GET`
- **Response (200 OK):**
```json
{
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "auth0Id": "google-oauth2|1234567890",
    "age": 25,
    "gender": "male",
    "height": 180,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "stats": {
        "id": 1,
        "userId": 1,
        "date": "2024-01-15T10:30:00.000Z",
        "weight": 75,
        "goal": "maintain",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
}
```

### 2. Create new user
Check if a profile exists and retrieve it.
- **URL:** `/user`
- **Method:** `POST`
Body:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "auth0Id": "google-oauth2|1234567890",
    "age": 25,
    "gender": "male",
    "height": 180,
    "weight": 75,
    "goal": "maintain"
}
```

- **Response (200 OK):**
```json
{
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "auth0Id": "google-oauth2|1234567890",
    "age": 25,
    "gender": "male",
    "height": 180,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "stats": {
        "id": 1,
        "userId": 1,
        "date": "2024-01-15T10:30:00.000Z",
        "weight": 75,
        "goal": "maintain",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
}
```


### 3. Update User Profile
Check if a profile exists and retrieve it.
- **URL:** `/user/:id`
- **Method:** `PUT`
Body:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "auth0Id": "google-oauth2|1234567890",
    "age": 25,
    "gender": "male",
    "height": 180,
    "weight": 77,
    "goal": "maintain"
}
```

- **Response (200 OK):**
```json
{
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "auth0Id": "google-oauth2|1234567890",
    "age": 25,
    "gender": "male",
    "height": 180,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "stats": {
        "id": 1,
        "userId": 1,
        "date": "2024-01-15T10:30:00.000Z",
        "weight": 77,
        "goal": "maintain",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
}
```

### 🛠 Possible Errors:
    401 Unauthorized: Token is missing or expired.
    404 Not Found: User with such Auth0 ID does not exist.
    400 Bad Request: Validation failed (e.g., negative weight).