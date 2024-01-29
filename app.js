import express from 'express';
import countries from './countries.js';
import { matchedData, validationResult } from 'express-validator';
import wishlistRouter from './wishlistRouter.js';

const app = express();
const PORT=3000||process.env.PORT;

app.use('/api/countries', wishlistRouter);




// ----------------listen--------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}
);