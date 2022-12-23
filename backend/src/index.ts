import { App } from './app';
import { config } from 'dotenv';

config();

if (
  process.env.PORT === undefined ||
  process.env.DB_URI === undefined ||
  process.env.DB_NAME === undefined ||
  process.env.CLIENT_ORIGIN_URL === undefined
) {
  throw new Error('Missing required environment variables.');
}

const port = process.env.PORT;
const app = new App();
const server = app.server;

module.exports = server.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
