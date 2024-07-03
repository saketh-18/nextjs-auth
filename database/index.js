import mongoose from 'mongoose';

export default async function connectToDb() {
    if (mongoose.connection.readyState) {
        console.log("mongoDB already connected");
        return;
    }

    const URL = "mongodb+srv://sakethayinavolu:9tK3wy8L4XPrdP7z@cluster0.or4zlgp.mongodb.net/nextjs";

    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongoDB connected successfully");
    } catch (e) {
        console.log("Error connecting to database, try again later");
        console.error(e);
    }
}
