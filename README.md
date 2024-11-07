An implementation of credential-based authentication in Next.js 15, from scratch inspired by Lucia Auth.

Currently it includes the logic for:

- saving sessions to MongoDB with Mongoose
- storing and retrieving session cookies
- password hashing
- password strength checking
- username, email, and password validation with Zod
- csrf protection

Future plans:

- email verification
- password reset
- forgot password
- 2fa with totp
- account recovery code

*You can find the full code in [Lucia Auth repository](https://github.com/lucia-auth/example-nextjs-email-password-2fa). However, it uses Next.js v14, which is behind the latest release.*