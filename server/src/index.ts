import * as express from 'express';

import { getLogger } from './logging/logger';
import { MODULE_NAME, PORT } from './constants';

if (!MODULE_NAME || !PORT) {
  throw new Error('Required environments variables are not set');
}

const logger = getLogger(MODULE_NAME);
const app: express.Express = express();

app.get('/', (request, response) => response.send('Hello from Express app'));

app.get('/health', (request, response) => response.send('Express app is accessible'));

app.listen(PORT, () => {
  logger.info(`Express server is listening on the port ${PORT}`);
});
