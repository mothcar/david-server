const mongoose = require('mongoose');


// const MONGO_URI = 'mongodb://localhost/your-database-name';
const MONGO_URI = 'mongodb+srv://rojinmothcar:1748rojin@cluster0.3byf2fd.mongodb.net/monkey?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });