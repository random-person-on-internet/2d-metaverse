# 🎒 Item API

APIs for managing item definitions in the game, including creating, updating, and retrieving all game item metadata (not user-owned instances).

---

## 📌 Base URL

```

/api/item
```

🛡️ All routes are protected with JWT (`Authorization: Bearer <token>`).  
🔒 Admin-only routes are explicitly marked.

---

## 📤 POST `/` — **[Admin Only]**

Create a new item definition.

### Request Body Example

```json
{
  "name": "Speed Potion",
  "description": "Temporarily boosts movement speed",
  "category": "BOOSTER",
  "price": 50,
  "imageUrl": "https://cdn.example.com/speed-potion.png",
  "canBeConsumed": true,
  "canBePlaced": false,
  "rarity": "RARE"
}
```

---

## 📥 GET `/`

Get all available (non-deleted) item definitions.

### Response Example

```json
[
  {
    "id": 1,
    "name": "Wooden Chair",
    "category": "FURNITURE",
    "price": 20,
    "canBePlaced": true,
    "canBeConsumed": false,
    "rarity": "COMMON",
    "createdAt": "2025-07-07T12:00:00.000Z"
  }
]
```

---

## 📥 GET `/:id`

Get a single item definition by ID.

---

## 🔄 PATCH `/:id` — **\[Admin Only]**

Update an item definition. Partial updates supported.

### Request Body (example)

```json
{
  "price": 75,
  "rarity": "EPIC"
}
```

---

## 🗑️ DELETE `/:id` — **\[Admin Only]**

Soft deletes an item (sets `isDeleted = true`).

---

## 📦 Notes

- This API only manages **Item Definitions**.
- Actual **instances** of items owned by users are handled separately (`ItemInstance`).
- `category`, `rarity`, and `effect.type` fields are enums.
- All items include a `createdAt` timestamp and a soft deletion flag.

---

## 🎮 Schema Reference

### `ItemDefinition`

| Field           | Type     | Notes                                 |
| --------------- | -------- | ------------------------------------- |
| `id`            | Int      | Primary key                           |
| `name`          | String   | Unique game item name                 |
| `description`   | String?  | Optional description                  |
| `category`      | Enum     | `FURNITURE`, `FOOD`, `BOOSTER`, etc   |
| `price`         | Int      | In-game currency cost                 |
| `imageUrl`      | String?  | CDN asset path                        |
| `canBePlaced`   | Boolean  | Placeable on the map                  |
| `canBeConsumed` | Boolean  | Consumable by user                    |
| `canBeSatOn`    | Boolean  | Allows players to sit                 |
| `isSolid`       | Boolean? | Blocks player movement                |
| `rarity`        | Enum     | `COMMON`, `RARE`, `EPIC`, `LEGENDARY` |
| `isDeleted`     | Boolean  | Used for soft deletion                |
| `createdAt`     | DateTime | Auto-generated on creation            |

---

## 🚫 Errors

Standard error response:

```json
{
  "message": "Item with ID 14 not found"
}
```

Status Codes:

- `201` Created
- `200` OK
- `204` No Content (for delete)
- `400` Bad Request
- `404` Not Found
- `500` Server Error
