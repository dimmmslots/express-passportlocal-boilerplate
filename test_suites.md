# test suites

## /auth/csrf

- [x] should return response data with csrf token

## /auth/register

- [x] given incorrect csrf token, it should return 403
- [x] given incorrect email format it should return 400
- [x] given password less than 5 characters, it should return 400
- [x] given missing name, it should return 400
- [x] given missing email, it should return 400
- [x] given missing password, it should return 400
- [x] given correct email and password format, it should return 201
- [x] given email has been taken, it should return 409

## /auth/login

- [x] given incorrect csrf token, it should return 403
- [x] given missing email, it should return 400
- [x] given missing password, it should return 400
- [x] given incorrect email or password, it should return 401
- [x] given correct email and password, it should return 200
