import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Listy API',
    version: '1.0.0',
    description: 'This is a basic CRUD, REST API for managing lists.',

    contact: {
      name: 'Listy Frontend (dev)',
      url: 'http://localhost:3000',
    },
  },
  servers: [
    {
      url: 'http://localhost:4500/api',
      description: 'Development server',
    },
  ],
  tags: [{ name: 'lists', description: 'Manage lists.' }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/services/**/routes.ts', './src/docs/components.yaml'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
