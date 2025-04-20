"use server"
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
const SALT_ROUNDS = 10;
const client = await clientPromise;
const db = client.db('taskmanager');

export async function loginUser(formData) {
    // const salt = bcrypt.genSaltSync(10)
    const username = formData.get("username");
    const password = formData.get("password");

    const existingUser = await db.collection("users").findOne({username});
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("existing user:", existingUser);
    console.log("hashedPassword", hashedPassword);  
    
    if (existingUser) {
        console.log("hashedpw from db: ", existingUser.password);
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            console.log("password matches");
            
        } else {
            console.log("password doesn't match");
        }
    } else {
        console.log("user does not exist");
    }
}

export async function createUser(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    // console.log("username", username); 
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
}