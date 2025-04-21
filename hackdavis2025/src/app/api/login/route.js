import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const SALT_ROUNDS = 10;
const client = await clientPromise;
const db = client.db('taskmanager');

export async function POST(req) {
    const body = await req.json();
    console.log("req body: ", body);

    const username = body["username"];
    const password = body["password"];

    const existingUser = await db.collection("users").findOne({username});
    
    if (existingUser) {
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            console.log("password matches");
            return NextResponse.json(
                { message: 'Logged in successfully.' },
                { status: 200 }
            );
        } else {
            console.log("password doesn't match");
            return NextResponse.json(
                { error: "Password doesn't match." },
                { status: 400 }
            );
        }
    } else {
        console.log("user does not exist");
        return NextResponse.json(
            { error: "User doesn't exist." },
            { status: 200 }
        );
    }
}