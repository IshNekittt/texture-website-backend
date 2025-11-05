# Документация Texture API

Это REST API для управления цифровыми текстурами и их категориями. API предоставляет публичный доступ для чтения данных и защищенный доступ для создания, изменения и удаления данных.

**Базовый URL:** `http://localhost:3000` (для локальной разработки)

## Аутентификация

Для выполнения защищенных действий (создание, обновление, удаление) необходимо передавать секретный ключ в заголовках каждого запроса. Публичные маршруты для получения данных не требуют аутентификации.

- **Тип:** API Key
- **Имя заголовка:** `X-API-Key`
- **Значение:** Ваш секретный ключ из переменной окружения `API_SECRET_KEY`.

---

## Маршруты (Endpoints)

### Категории (Categories)

#### `GET /categories`

Получает список всех доступных категорий.

- **Доступ:** Публичный
- **Успешный ответ (`200 OK`):**
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

### Текстуры (Textures)

#### `GET /textures`

Получает список всех текстур с поддержкой фильтрации, сортировки и пагинации.

- **Доступ:** Публичный
- **Query-параметры (опционально):**
  - `categoryId` (string): Фильтрует текстуры по ID категории.
  - Пример: `/textures?categoryId=690b29a3f88b1ba42d4e22b7`
  - `page` (number): Номер страницы для пагинации (по умолчанию `1`).
  - `perPage` (number): Количество элементов на странице (по умолчанию `10`).
  - `sortBy` (string): Поле для сортировки. Доступные значения: `_id`, `textureName`, `createdAt`. (По умолчанию `_id`).
  - `sortOrder` (string): Порядок сортировки. Доступные значения: `asc`, `desc`. (По умолчанию `asc`).
- **Успешный ответ (`200 OK`):**
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

Получает одну текстуру по ее уникальному ID.

- **Доступ:** Публичный
- **Успешный ответ (`200 OK`):**
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

Создает новую текстуру.

- **Доступ:** **Защищенный (`X-API-Key` обязателен)**
- **Тело запроса (Body):**
  ```json
  {
    "textureName": "My New Texture",
    "description": "A detailed description.",
    "categoryId": "690b29a3f88b1ba42d4e22b7",
    "imagesUrls": ["http://.../image1.jpg"],
    "fileUrl": "http://.../texture.zip"
  }
  ```
- **Успешный ответ (`201 Created`):**
  ```json
  {
    "status": 201,
    "message": "Successfully created a texture!",
    "data": {
      "textureName": "My New Texture",
      "description": "A detailed description.",
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

Частично обновляет существующую текстуру по ее ID.

- **Доступ:** **Защищенный (`X-API-Key` обязателен)**
- **Тело запроса (Body):** Любое подмножество полей, которые можно изменять.
  ```json
  {
    "description": "An updated description"
  }
  ```
- **Успешный ответ (`200 OK`):** Возвращает полный, **уже обновленный** объект текстуры.

#### `DELETE /textures/:textureId`

Удаляет текстуру по ее ID.

- **Доступ:** **Защищенный (`X-API-Key` обязателен)**
- **Успешный ответ (`204 No Content`):** В случае успеха сервер возвращает пустой ответ.

---

## Ответы об ошибках

- **`400 Bad Request`**: Некорректные данные в теле запроса (ошибка валидации) или невалидный формат ID в URL.
- **`401 Unauthorized`**: Отсутствует или неверный `X-API-Key` для защищенных маршрутов.
- **`404 Not Found`**: Ресурс (текстура, категория) не найден, или запрошен несуществующий маршрут.
- **`409 Conflict`**: Попытка создать текстуру с `fileUrl`, который уже существует в базе данных.
- **`500 Internal Server Error`**: Внутренняя ошибка сервера.
