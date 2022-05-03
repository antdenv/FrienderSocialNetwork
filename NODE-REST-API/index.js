const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./dbConfig');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRouter');
const multer = require('multer');
const path = require('path');

const PORT = process.env.BACKEND_PORT || 8800;

const app = express();
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req,res) => {
    try {
        return res.status(200).json('file has been uploaded');
    } catch(error) {
        console.log(error);
    }
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error.message);
    }
};

start();


