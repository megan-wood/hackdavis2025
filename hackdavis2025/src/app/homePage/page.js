"use client";
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

function ClassForm({username}) {
    const [classTitle, setClassTitle] = useState("");

    async function handleClassSubmission(e) {
        e.preventDefault();
        try {
            console.log("class title", classTitle);
            console.log("username: ", username);  
            // add that title to that user's database
            const response = await fetch("http://localhost:3000/api/addClass", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                }, 
                body: JSON.stringify({username, classTitle}),
            });
            // const data = await response.json();
            // console.log("response: ", data);
            if (response.ok) {
                console.log("add class successful");
                setClassTitle("");
            }
            // setClassTitle("")
        } catch (error) {
            console.error("there was an error adding this class: ", error); 
            setClassTitle("")
        }
    }

    return (
        <div>
            <form onSubmit={handleClassSubmission}>
                <div>
                    <label htmlFor="classTitle">Class:</label>
                    <br></br>
                    <input
                    type="text"
                    id="classTitle"
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                    required
                    />
                </div>
                <button type="submit">Add class</button>
            </form>
        </div>
    );
}

export default function HomePage() {
    const { username } = useUser();
    console.log("username: ", username);


    return (
        <>
            <p>Hello {username} </p>
            <ClassForm username={username}/>
        </>
    );
}