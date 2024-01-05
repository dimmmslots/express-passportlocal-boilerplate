import csurf from "csurf";

const csrfProtection = csurf({
  cookie: {
    maxAge: 604800,
    secure: true,
    sameSite: "lax",
    httpOnly: true,
  },
});

export default csrfProtection;
