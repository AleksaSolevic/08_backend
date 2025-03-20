# 08_backend

🔗 Links
- GitHub Repository:
[https://github.com/AleksaSolevic/08_backend]

### Overview
This Blog Backend is built using Node.js, Express, and Prisma as the ORM. It provides functionalities for user authentication and post management, allowing users to create accounts, log in, and manage their blog posts. For authentication, the API uses JWT, which ensures that only authenticated users can perform certain actions. Authentication is required for specific routes, allowing logged-in users to create, update, and delete their own posts while still enabling anyone to view all posts.

The API supports full CRUD operations for both users and posts, offering a secure and efficient way to manage blog content and user accounts. The project is structured using Express, with middleware handling authentication, request validation, and error handling. If something goes wrong, such as a user trying to delete a post they don’t own, the server responds with a clear message.

While the backend is fully functional with all endpoints, there is still room for improvement and additional upgrades. Adding more tables to the database is definitely one of the top priorities, along with implementing post pagination, a token refresh system, and roles for extra permissions, such as an admin role. Additionally, a frontend will be developed to turn this into a complete blog application.

## Technologies used

- Node.js as runtime environment
- Express.js as framework
- Prisma as ORM for database
- MySql as database for storing users and posts
- bcrypt as library for hashing passwords
- JWT as token for authentication
- Express-validator as middleware for validation data requests
- dotenv for managing environment variables

## Advantages

* Security: The Api uses JWT autentication are some routs protected for only authenticate users.
* Database Managment:
Using Prisma is database interaction consistent.
* Error handling:
Every request has correct and clear response from server.
* Validation:
By using Express-Validator is secured that right data format from email, name and password. But also in post with content and title.
* Scalability:
The project uses Express and Prisma and has good scalability and opportunity to grow with additional features.


## Disadvantages

* Token refresh: There is no refresh token mechanism for prolonging logging in. Instead, the must user log in every time token expires.
* No paganation: There is no paganation for posts which can cause inefficiency when fetching larger amounts of data.
* Lack of Integration Tests: There are no automated tests to detect bugs. Potential issues may go unnoticed.


## Future improvements

* Frontend
* Pagination for posts
* Basic unit tests
* Refresh tokens
* Create Admin role for extra permissions.
* Add more tables, for comments, likes etc.
