/* eslint-disable no-console */

'use strict';

import { createServer } from './app';

const PORT = process.env.PORT || 3007;

createServer().listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
