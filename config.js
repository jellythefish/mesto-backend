const PORT = process.env.PORT || 3000;
const DATABASE = 'mongodb://localhost:27017/mestodb';
const JWT_SECRET = 'a3c47d9524c35f74e57a1a3a37b82c46c2c73258cd32860185a536bffc23fcb6';

module.exports = { PORT, DATABASE, JWT_SECRET };
