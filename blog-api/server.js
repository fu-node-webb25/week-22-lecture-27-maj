import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import keysRouter from './routes/keys.route.js';
import authRouter from './routes/auth.route.js';
import postsRouter from './routes/posts.route.js';
import commentsRouter from './routes/comments.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;
const swaggerDocs = YAML.load('./docs/docs.yml');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/keys', keysRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Database
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
});

app.use(errorHandler);