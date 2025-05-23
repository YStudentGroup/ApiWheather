import mongoose from 'mongoose'

export const dbConnect = async () => {
    await mongoose.connect(String(process.env.MONGODB_URI), {
        dbName: 'weather',
    });
}