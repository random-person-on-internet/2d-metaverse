# 👤 User API

Endpoints related to user profile, password, avatar, coins, and items.

---

## 📌 Base URL

```

/api/user
```

⚠️ All routes require a valid JWT (`Authorization: Bearer <token>`).  
Most routes also require user to be modifying their own data (`ensureSelf` middleware).

---

## 🔍 GET `/me`

Returns the current authenticated user’s data.

### Response

```json
{
  "id": 1,
  "username": "uname",
  "avatar": "https://cdn.example.com/avatar.png",
  "coins": 100,
  "items": [
    /* ItemInstance[] */
  ]
}
```

---

## 🔍 GET `/:id`

Fetch data of a specific user. Requires authentication **and** ownership (`ensureSelf`).

---

## 🔄 PATCH `/:id/password`

Update user’s password.

### Request Body

```json
{
  "password": "newSecurePassword123"
}
```

---

## 🔄 PATCH `/:id/username`

Update user’s username.

### Request Body

```json
{
  "username": "newUsername"
}
```

---

## 🔄 PATCH `/:id/avatar`

Update user’s avatar URL.

### Request Body

```json
{
  "avatar": "https://cdn.example.com/avatar2.png"
}
```

---

## 🔄 PATCH `/:id/coins`

Set user's coin balance. Intended for admin/moderation or in-game reward usage.

### Request Body

```json
{
  "coins": 250
}
```

---

## ➕ POST `/:id/items`

Add a new item to the user.

### Request Body

```json
{
  "definitionId": 5,
  "x": 3,
  "y": 7,
  "stackCount": 1,
  "isEquipped": false,
  "isPlaced": true
}
```

### Response

Returns the newly created `ItemInstance`.

---

## 🔄 PATCH `/:id/items/:itemId`

Update properties of a user-owned item.

### Example Payload

```json
{
  "stackCount": 2,
  "isEquipped": true
}
```

---

## 🗑️ DELETE `/:id/items/:itemId`

Deletes a specific user-owned item.

Returns: `204 No Content`

---

## 🗑️ DELETE `/:id`

Marks the user as deleted (`isDeleted = true`).

Returns: `204 No Content`

---

## 🛡️ Notes

- IDs are integers.
- All mutations require token **and** that `:id` matches the authenticated user’s ID.
- `items` refers to `ItemInstance[]`, which relate to `ItemDefinition` by foreign key.
