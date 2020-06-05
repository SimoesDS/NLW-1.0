import express from 'express';
import routes from './routes';


const app = express();

app.use(express.json());
app.use(routes);

// Yup para validar os campos do body
// Igual Yup https://www.npmjs.com/package/celebrate

app.listen(3333);
