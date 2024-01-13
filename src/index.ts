import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { HOST_NAME, NODE_ENV } from './config';
import { connectDB } from './constants/config';
import { API } from './constants/paths';
import { defaultErrorHandler } from './middlewares/error.middlewares';
import route from './routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use(express.json());

app.use(route);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Soccer Management Specification',
      version: '1.0.0',
      description: 'Soccer Management API Specification, website for soccer management model',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [{ url: API }],
  },
  apis: ['src/routes/*.ts', 'src/models/schema/*.ts', 'src/dtos/*.ts'],
};

const specs = swaggerJSDoc(options);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(specs));
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV || 'development'} =======`);
  logger.info(`🚀 App listening on http://${HOST_NAME}:${PORT}${API}`);
  logger.info(`🚀 API Spec http://${HOST_NAME}:${PORT}/api-documentation`);
  logger.info(`=================================`);
});
