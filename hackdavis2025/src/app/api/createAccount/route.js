import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
const SALT_ROUNDS = 10;
const client = await clientPromise;
const db = client.db('taskmanager');

export async function POST(req) {
    const body = await req.json();
    console.log("req body: ", body);
    const username = body["username"];
    const password = body["password"];
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); 
    // console.log("hashed password", hashedPassword);
    
    const existingUser = await db.collection("users").findOne({username});

    if (existingUser) {
        console.log("user already exists");
    } else {
        const result = await db.collection("users").insertOne({
            username,
            password: hashedPassword,
        });
    }
    return Response.json({ received: true });
}