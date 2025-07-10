# 🏠 Room API

APIs for managing rooms, users inside rooms, room maps, and inter-room doors.

---

## 📌 Base URL

```

/api/room
```

⚠️ All routes require a valid JWT (`Authorization: Bearer <token>`)

---

## 📁 Rooms

---

### 📤 POST `/`

Create a new room.

#### Request Body (example)

```json
{
  "name": "Pixel Café",
  "type": "CAFE",
  "x": 10,
  "y": 20,
  "xlen": 15,
  "ylen": 10,
  "description": "Chill hangout spot",
  "isPublic": true
}
```

---

### 📥 GET `/`

Get all available rooms (excluding deleted).

---

### 📥 GET `/:id`

Fetch details of a specific room by ID.

---

### 🔄 PATCH `/:id`

Update an existing room.

#### Request Body (partial allowed)

```json
{
  "name": "Updated Café Name",
  "xlen": 20,
  "ylen": 12
}
```

---

### 🗑️ DELETE `/:id`

Soft deletes the room (`isDeleted = true`).

---

## 🚪 Doors

---

### 📥 GET `/:id/doors`

Get all outgoing doors from a room.

#### Response (example)

```json
{
  "id": 3,
  "fromDoors": [
    {
      "id": 1,
      "x": 5,
      "y": 2,
      "toRoomId": 6,
      "toRoom": {
        "id": 6,
        "name": "Main Hall",
        "type": "TOWNHALL"
      }
    }
  ]
}
```

---

### 📤 POST `/:id/doors`

Create a door from this room to another.

#### Request Body

```json
{
  "fromRoomId": 1,
  "toRoomId": 6,
  "x": 5,
  "y": 2
}
```

---

### 🗑️ DELETE `/doors/:doorId`

Delete a room door permanently.

---

## 🧍 Users in Rooms

---

### 📤 POST `/:id/join`

Add a user to a room.

#### Request Body

```json
{
  "userId": 42,
  "x": 3,
  "y": 5,
  "team": "red"
}
```

---

### 📤 POST `/:id/leave`

Remove a user from a room.

#### Request Body

```json
{
  "userId": 42
}
```

---

### 📥 GET `/:id/users`

Get a list of users currently in the room.

#### Response (example)

```json
[
  {
    "id": 1,
    "userId": 42,
    "roomId": 3,
    "x": 3,
    "y": 5,
    "team": "red",
    "joinedAt": "2025-07-07T09:00:00Z",
    "user": {
      "id": 42,
      "username": "uname",
      "avatar": "https://cdn.example.com/avatar.png"
    }
  }
]
```

---

### 🔄 PATCH `/:id/user`

Update a user's data in a room.

#### Request Body

```json
{
  "userId": 42,
  "x": 10,
  "y": 2,
  "team": "blue",
  "isMuted": true
}
```

---

## 🗺️ Map

---

### 📥 GET `/map`

Returns minimal public data for rendering the world map (only non-deleted public rooms).

#### Response (example)

```json
[
  {
    "id": 1,
    "name": "Spawn Area",
    "type": "PLAZA",
    "x": 0,
    "y": 0,
    "xlen": 20,
    "ylen": 20
  }
]
```

---

## 🛡️ Notes

- `roomId`, `userId`, and `doorId` are integers.
- Room positions use `(x, y)` for top-left and `xlen`, `ylen` for dimensions.
- `team` and `isMuted` are optional metadata used inside team-based or chat-restricted rooms.
- All actions are protected via token middleware.
