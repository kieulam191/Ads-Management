import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: "Token admin",
    },
  },
  security: [{
    Bearer: []
  }]

};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);