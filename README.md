# Texture API Documentation

This is a REST API for managing digital textures and their categories. The API provides public access for reading data and protected access for creating, modifying, and deleting data.

**Base URL:** `http://localhost:3000` (for local development)

## Authentication

To perform protected actions (create, update, delete), you must pass a secret key in the headers of each request. Public routes for fetching data do not require authentication.

- **Type:** API Key
- **Header Name:** `X-API-Key`
- **Value:** Your secret key from the `API_SECRET_KEY` environment variable.

---

## Endpoints

### Categories

#### `GET /categories`

Retrieves a list of all available categories.

- **Access:** Public
- **Successful Response (`200 OK`):** Returns an array of category objects.

#### `GET /categories/:categoryId`

Retrieves a single category by its unique ID.

- **Access:** Public
- **Successful Response (`200 OK`):** Returns a single category object.

#### `POST /categories`

Creates a new category.

- **Access:** **Protected (`X-API-Key` is required)**
- **Request Body:**
  ```json
  {
    "categoryName": "New Category"
  }
  ```
- **Successful Response (`201 Created`):** Returns the full object of the newly created category.

#### `PATCH /categories/:categoryId`

Partially updates an existing category by its ID.

- **Access:** **Protected (`X-API-Key` is required)**
- **Request Body:**
  ```json
  {
    "categoryName": "Updated Category Name"
  }
  ```
- **Successful Response (`200 OK`):** Returns the full, **updated** category object.

#### `DELETE /categories/:categoryId`

Deletes a category by its ID.

- **Access:** **Protected (`X-API-Key` is required)**
- **Successful Response (`204 No Content`):** Returns an empty response.

---

### Textures

#### `GET /textures`

Retrieves a list of all textures with support for filtering, sorting, and pagination.

- **Access:** Public
- **Query Parameters (optional):**
  - `categoryId` (string): Filters textures by category ID.
  - `page` (number): Page number for pagination (default `1`).
  - `perPage` (number): Number of items per page (default `10`).
  - `sortBy` (string): Field to sort by (`_id`, `textureName`, `createdAt`).
  - `sortOrder` (string): Sort order (`asc`, `desc`).

#### `GET /textures/:textureId`

Retrieves a single texture by its unique ID.

- **Access:** Public

#### `POST /textures`

Creates a new texture.

- **Access:** **Protected (`X-API-Key` is required)**
- **Request Body:**
  ```json
  {
    "textureName": "My New Texture",
    "description": "A detailed description.",
    "categoryId": "...",
    "imagesUrls": ["http://.../image1.jpg"],
    "fileUrl": "http://.../texture.zip"
  }
  ```

#### `PATCH /textures/:textureId`

Partially updates an existing texture by its ID.

- **Access:** **Protected (`X-API-Key` is required)**

#### `DELETE /textures/:textureId`

Deletes a texture by its ID.

- **Access:** **Protected (`X-API-Key` is required)**

---

## Error Responses

- **`400 Bad Request`**: Invalid data in the request body (validation error) or an invalid ID format in the URL.
- **`401 Unauthorized`**: Missing or incorrect `X-API-Key` for protected routes.
- **`404 Not Found`**: The requested resource (texture, category) was not found, or the route does not exist.
- **`409 Conflict`**: Attempt to create a resource with a `fileUrl` (for textures) or `categoryName` (for categories) that already exists in the database.
- **`500 Internal Server Error`**: An internal server error occurred.
