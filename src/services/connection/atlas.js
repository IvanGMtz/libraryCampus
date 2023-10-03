import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export async function con() {
    try {
        const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.jzmvywo.mongodb.net/${process.env.ATLAS_DB}`
        const client = new MongoClient(uri);
        await client.connect(); 
        return client.db();
    } catch (error) {
        return { status: 500, message: error }
    }
}
