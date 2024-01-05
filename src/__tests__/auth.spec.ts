import { PrismaClient } from "@prisma/client";
import { describe } from "node:test";
import createServer from "../utils/server";
import supertest from "supertest";
const app = createServer();
const api_prefix = "/api";

describe("auth routes", () => {
  let prisma: PrismaClient;
  let csrfToken: string;
  let cookies: string[];
  beforeAll(async () => {
    prisma = new PrismaClient();
    const response = await supertest(app).get(`${api_prefix}/auth/csrf`);
    const setCookieHeader = response.headers["set-cookie"];
    cookies = Array.isArray(setCookieHeader)
      ? setCookieHeader[1]
      : [setCookieHeader];
    console.log(cookies);
    csrfToken = response.body["data"];
  });

  describe("csrf", () => {
    describe("given endpoint is accessed", () => {
      it("should return csrf token", async () => {
        const response = await supertest(app)
          .get(`${api_prefix}/auth/csrf`)
          .expect(200);
        expect(response.body).toHaveProperty("data");
      });
    });
  });

  describe("register", () => {
    describe("given x", () => {
      it("should return ", async () => {
        const payload = {
          name: "Takemikazuchi",
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .send(payload)
          .expect(403);

        expect(response.body).toHaveProperty("message", "invalid csrf token");
      });
    });
    describe("given incorrect _csrf token", () => {
      it("should return 403", async () => {
        const payload = {
          name: "Takemikazuchi",
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .send(payload)
          .expect(403);

        expect(response.body).toHaveProperty("message", "invalid csrf token");
      });
    });
    describe("given incorrect email format", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          name: "Takemikazuchi",
          email: "takemikazuchigmail.com",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty("message", "email Invalid email");
      });
    });
    describe("given password less than 5 characters", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          name: "Takemikazuchi",
          email: "takemikazuchi@gmail.com",
          password: "warr",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "password String must contain at least 5 character(s)"
        );
      });
    });
    describe("given missing name", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty("message", "name Required");
      });
    });
    describe("given missing email", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          name: "Takemikazuchi",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty("message", "email Required");
      });
    });
    describe("given missing password", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          name: "Takemikazuchi",
          email: "takemikazuchi@gmail.com",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty("message", "password Required");
      });
    });
    describe("given correct email and password format", () => {
      it("should return 201", async () => {
        const payload = {
          _csrf: csrfToken,
          name: "Takemikazuchi",
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const expected = {
          name: payload.name,
          email: payload.email,
          picture: null,
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(201);

        expect(response.body).toHaveProperty("data", expected);
      }, 10000);
    });
    describe("given email has been taken", () => {
      it("should return 409", async () => {
        const payload = {
          _csrf: csrfToken,
          name: "Takemikazuchi",
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/register`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(409);

        expect(response.body).toHaveProperty(
          "message",
          "Email has already been taken."
        );
      });
    });
  });

  describe("login", () => {
    describe("given incorrect csrf token", () => {
      it("should return 403", async () => {
        const payload = {
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/login`)
          .send(payload)
          .expect(403);

        expect(response.body).toHaveProperty("message", "invalid csrf token");
      });
    });
    describe("given missing email", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          password: "warriorspride",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/login`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty("message", "email Required");
      });
    });
    describe("given missing password", () => {
      it("should return 400", async () => {
        const payload = {
          _csrf: csrfToken,
          email: "takemikazuchi@gmail.com",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/login`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(400);

        expect(response.body).toHaveProperty("message", "password Required");
      });
    });
    describe("given wrong email and password", () => {
      it("should return 401", async () => {
        const payload = {
          _csrf: csrfToken,
          email: "takemikazuchi@gmail.com",
          password: "takemikazuchi1",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/login`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(401);

        expect(response.body).toHaveProperty(
          "message",
          "Incorrect email or password"
        );
      });
    });
    describe("given correct email and password", () => {
      it("should return 200", async () => {
        const payload = {
          _csrf: csrfToken,
          email: "takemikazuchi@gmail.com",
          password: "warriorspride",
        };
        const expected = {
          name: "Takemikazuchi",
          email: payload.email,
          picture: "",
        };
        const response = await supertest(app)
          .post(`${api_prefix}/auth/login`)
          .set("Cookie", cookies)
          .send(payload)
          .expect(200);

        expect(response.body).toHaveProperty("data", expected);
      });
    });
  });

  afterAll(async () => {
    prisma.$connect();
    await prisma.user.delete({ where: { email: "takemikazuchi@gmail.com" } });
    prisma.$disconnect();
  });
});
