const mongoose = require('mongoose');

const connectToDb = async () => {
    mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(">>>>> DATABASE CONNECTION FAILED");
            throw err
        }

        console.log(">>>>> DATABASE CONNECTION IS LIVE");
    });
};

module.exports = {connectToDb};