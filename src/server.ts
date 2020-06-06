import express from 'express';
import path from 'path';
import routes from './routes';


const app = express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// Yup para validar os campos do body
// Igual Yup https://www.npmjs.com/package/celebrate

app.listen(3333);
