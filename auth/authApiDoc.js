import swaggerJSDoc from "swagger-jsdoc";

const authApiDoc = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Galaxy Atlas Auth',
      version: '1.0.0'
    },
  },
  apis: [
    './routes/*.js'
  ]
});

export default authApiDoc;
