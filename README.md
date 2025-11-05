# Документація Texture API

Це REST API для керування цифровими текстурами та їхніми категоріями. API надає публічний доступ для читання даних та захищений доступ для створення, зміни та видалення даних.

**Базовий URL:** `http://localhost:3000` (для локальної розробки)

## Аутентифікація

Для виконання захищених дій (створення, оновлення, видалення) необхідно передавати секретний ключ у заголовках (headers) кожного запиту. Публічні маршрути для отримання даних не вимагають аутентифікації.

- **Тип:** API Key
- **Ім'я заголовка:** `X-API-Key`
- **Значення:** Ваш секретний ключ із змінної оточення `API_SECRET_KEY`.

---

## Маршрути (Endpoints)

### Категорії (Categories)

#### `GET /categories`

Отримує список усіх доступних категорій.

- **Доступ:** Публічний
- **Успішна відповідь (`200 OK`):**
  ```json
  {
    "status": 200,
    "message": "Successfully found categories!",
    "data": [
      {
        "_id": "690b29a3f88b1ba42d4e22b7",
        "categoryName": "wood",
        "createdAt": "...",
        "updatedAt": "..."
      },
      {
        "_id": "690b2b2af88b1ba42d4e22bb",
        "categoryName": "leather",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```

---

### Текстури (Textures)

#### `GET /textures`

Отримує список усіх текстур з підтримкою фільтрації, сортування та пагінації.

- **Доступ:** Публічний
- **Query-параметри (опціонально):**
  - `categoryId` (string): Фільтрує текстури за ID категорії.
    - Приклад: `/textures?categoryId=690b29a3f88b1ba42d4e22b7`
  - `page` (number): Номер сторінки для пагінації (за замовчуванням `1`).
  - `perPage` (number): Кількість елементів на сторінці (за замовчуванням `10`).
  - `sortBy` (string): Поле для сортування. Доступні значення: `_id`, `textureName`, `createdAt`. (За замовчуванням `_id`).
  - `sortOrder` (string): Порядок сортування. Доступні значення: `asc`, `desc`. (За замовчуванням `asc`).
- **Успішна відповідь (`200 OK`):**
  ```json
  {
    "status": 200,
    "message": "Successfully found textures!",
    "data": {
      "data": [
        {
          "_id": "690b2236f88b1ba42d4e22b5",
          "categoryId": {
            "_id": "690b29a3f88b1ba42d4e22b7",
            "categoryName": "wood"
          },
          "imagesUrls": [],
          "fileUrl": "some_file_url",
          "description": "Some description of texture",
          "textureName": "Name of texture"
        }
      ],
      "page": 1,
      "perPage": 10,
      "totalPages": 1,
      "totalItems": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
  ```

#### `GET /textures/:textureId`

Отримує одну текстуру за її унікальним ID.

- **Доступ:** Публічний
- **Успішна відповідь (`200 OK`):**
  ```json
  {
    "status": 200,
    "message": "Successfully found texture with id 690b2236f88b1ba42d4e22b5!",
    "data": {
      "_id": "690b2236f88b1ba42d4e22b5",
      "categoryId": {
        "_id": "690b29a3f88b1ba42d4e22b7",
        "categoryName": "wood"
      },
      "imagesUrls": [],
      "fileUrl": "some_file_url",
      "description": "Some description of texture",
      "textureName": "Name of texture"
    }
  }
  ```

#### `POST /textures`

Створює нову текстуру.

- **Доступ:** **Захищений (`X-API-Key` обов'язковий)**
- **Тіло запиту (Body):**
  ```json
  {
    "textureName": "Моя нова текстура",
    "description": "Детальний опис.",
    "categoryId": "690b29a3f88b1ba42d4e22b7",
    "imagesUrls": ["http://.../image1.jpg"],
    "fileUrl": "http://.../texture.zip"
  }
  ```
- **Успішна відповідь (`201 Created`):**
  ```json
  {
    "status": 201,
    "message": "Successfully created a texture!",
    "data": {
      "textureName": "Моя нова текстура",
      "description": "Детальний опис.",
      "categoryId": "690b29a3f88b1ba42d4e22b7",
      "imagesUrls": ["http://.../image1.jpg"],
      "fileUrl": "http://.../texture.zip",
      "_id": "690b671235b1e1b10b237e78",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

#### `PATCH /textures/:textureId`

Частково оновлює існуючу текстуру за її ID.

- **Доступ:** **Захищений (`X-API-Key` обов'язковий)**
- **Тіло запиту (Body):** Будь-який набір полів, які можна змінювати.
  ```json
  {
    "description": "Оновлений опис"
  }
  ```
- **Успішна відповідь (`200 OK`):** Повертає повний, **вже оновлений** об'єкт текстури.

#### `DELETE /textures/:textureId`

Видаляє текстуру за її ID.

- **Доступ:** **Захищений (`X-API-Key` обов'язковий)**
- **Успішна відповідь (`204 No Content`):** У разі успіху сервер повертає порожню відповідь.

---

## Відповіді про помилки

- **`400 Bad Request`**: Некоректні дані в тілі запиту (помилка валідації) або невалідний формат ID в URL.
- **`401 Unauthorized`**: Відсутній або невірний `X-API-Key` для захищених маршрутів.
- **`404 Not Found`**: Ресурс (текстура, категорія) не знайдено, або запит на неіснуючий маршрут.
- **`409 Conflict`**: Спроба створити текстуру з `fileUrl`, який вже існує в базі даних.
- **`500 Internal Server Error`**: Внутрішня помилка сервера.
