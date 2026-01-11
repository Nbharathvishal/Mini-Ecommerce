const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Node.js server",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["../routes/*.js"],
};

module.exports = swaggerJsdoc(options);
