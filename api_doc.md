# API Documentation

This document provides detailed information about the API endpoints available in the DevOps Git Demo application.

## Base URL

All endpoints are relative to: `http://localhost:3000`

## Authentication

Most endpoints require authentication. You should include the user ID in the `user-id` header.

## Endpoints

### Authentication

#### POST /login

Authenticates a user and returns user information.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response:**

- Status Code: 200 OK
- Content:

```json
{
  "success": true,
  "user": {
    "id": "number",
    "username": "string",
    "role": "string"
  }
}
```

**Error Responses:**

- Status Code: 400 Bad Request (Missing username or password)
- Status Code: 401 Unauthorized (Invalid credentials)

### User Management

#### GET /users

Returns a list of all users. Requires admin role.

**Headers:**

- `user-id`: ID of the authenticated user (must be admin)

**Success Response:**

- Status Code: 200 OK
- Content: Array of user objects

```json
[
  {
    "id": "number",
    "username": "string",
    "role": "string",
    "email": "string"
  }
]
```

**Error Response:**

- Status Code: 403 Forbidden (Non-admin access)

#### GET /users/:id

Returns a specific user by ID.

**Parameters:**

- `id`: User ID

**Success Response:**

- Status Code: 200 OK
- Content: User object

```json
{
  "id": "number",
  "username": "string",
  "role": "string",
  "email": "string"
}
```

**Error Response:**

- Status Code: 404 Not Found (User not found)

#### POST /users

Creates a new user. Requires admin role.

**Headers:**

- `user-id`: ID of the authenticated user (must be admin)

**Request Body:**

```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "role": "string" (optional, defaults to "user")
}
```

**Success Response:**

- Status Code: 201 Created
- Content: Created user object (without password)

**Error Responses:**

- Status Code: 400 Bad Request (Missing required fields)
- Status Code: 403 Forbidden (Non-admin access)

#### PUT /users/:id

Updates an existing user. Requires admin role.

**Headers:**

- `user-id`: ID of the authenticated user (must be admin)

**Parameters:**

- `id`: User ID

**Request Body:**

```json
{
  // Any user properties to update
}
```

**Success Response:**

- Status Code: 200 OK
- Content: Updated user object (without password)

**Error Responses:**

- Status Code: 403 Forbidden (Non-admin access)
- Status Code: 404 Not Found (User not found)

#### DELETE /users/:id

Deletes a user. Requires admin role.

**Headers:**

- `user-id`: ID of the authenticated user (must be admin)

**Parameters:**

- `id`: User ID

**Success Response:**

- Status Code: 204 No Content

**Error Responses:**

- Status Code: 403 Forbidden (Non-admin access)
- Status Code: 404 Not Found (User not found)

### Admin Panel

#### GET /admin

Protected route for admin panel access.

**Headers:**

- `user-id`: ID of the authenticated user (must be admin)

**Success Response:**

- Status Code: 200 OK
- Content:

```json
{
  "message": "Admin panel accessed successfully"
}
```

**Error Response:**

- Status Code: 403 Forbidden (Non-admin access)