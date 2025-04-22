import mongoose from 'mongoose'

export const dbConnect = async () => {
    console.log('Connecting to MongoDB...')
    console.log('MongoDB URI:', process.env.MONGODB_URI)
    await mongoose.connect(String(process.env.MONGODB_URI), {
        dbName: 'weather',
    });
    console.log('MongoDB connected')
}
