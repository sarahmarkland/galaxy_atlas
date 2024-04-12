import swaggerJSDoc from "swagger-jsdoc";

const apiDoc = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Galaxy Atlas',
      version: '1.0.0'
    },
  },
  apis: [
    './routes/*.js'
  ]
});

export default apiDoc;
