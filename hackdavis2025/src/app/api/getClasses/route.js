import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    console.log("username db search: ", username);

    const client = await clientPromise;
    const db = client.db("taskmanager");

    const user = await db.collection("users").findOne({username});

    if (user) {
        return NextResponse.json({ classes: user.classes || [] });
    }
    return NextResponse.json({ error: "User not found" }, { status: 404 });
}