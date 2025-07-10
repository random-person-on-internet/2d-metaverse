# 🔐 Auth API

Handles user registration, login, and authentication checks.

---

## 📌 Base URL

```

/api/auth
```

---

## 📝 POST `/signup`

Registers a new user.

### Request Body

```json
{
  "email": "test@example.com",
  "password": "securepass123",
  "username": "uname",
  "avatar": "https://cdn.example.com/avatars/1.png" // optional
}
```

### Response

```json
{
  "token": "jwt-token-string"
}
```

### Status Codes

- `200 OK` – Signup successful, JWT returned
- `400 Bad Request` – User already exists
- `500 Internal Server Error` – Signup failed due to server issue

---

## 📝 POST `/login`

Authenticates an existing user and returns a JWT.

### Request Body

```json
{
  "email": "test@example.com",
  "password": "securepass123"
}
```

### Response

```json
{
  "token": "jwt-token-string"
}
```

### Status Codes

- `200 OK` – Login successful
- `401 Unauthorized` – Invalid credentials
- `500 Internal Server Error` – Login failed due to server issue

---

## 🔒 GET `/protected`

Returns a protected resource. Requires a valid token.

### Request Headers

```
Authorization: Bearer <jwt-token-string>
```

### Response

```json
{
  "message": "Hello User <userId>"
}
```

### Status Codes

- `200 OK` – Token is valid, user authorized
- `401 Unauthorized` – Token missing or malformed
- `403 Forbidden` – Token invalid or expired

---

## 🛡️ Notes

- All tokens are **JWTs**, signed using a secret key.
- The protected route is used to test authentication and JWT verification.
