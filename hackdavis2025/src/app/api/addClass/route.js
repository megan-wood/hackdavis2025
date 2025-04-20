import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const client = await clientPromise;
const db = client.db('taskmanager');

export async function POST(req) {
    const body = await req.json();
    console.log("body", body); 
    const username = body["username"];
    const classTitle = body["classTitle"];
    
    await db.collection("users").updateOne(
        {username: username}, 
        {
            $addToSet: {
                classes: {
                    classTitle
                }
            }
        }
    );
    return NextResponse.json(
        { message: 'Class added successfully.' },
        { status: 200 }
    );
}