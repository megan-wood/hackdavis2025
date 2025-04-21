"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';


export default function CreateAccount() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');;
    const { setUsersUsername } = useUser();

    async function handleCreateAccount(e) {
        e.preventDefault(); // prevents reload
        try {
            console.log("username:", username);
            const response = await fetch('http://localhost:3000/api/createAccount', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
            console.log("response:", data);
            if (response.ok) {
                // Login successful!
                setError(''); // Clear any previous error
                console.log('Create successful', data);
                setUsersUsername(username);
                router.push("/homePage");
                // Redirect the user to a protected page
            // navigate('/dashboard'); // Replace '/dashboard' with the desired redirect path
            } else {
                // Login failed
                setError(data.error || 'Something went wrong');
                console.log("message: ", data.error); 
                console.error('Login failed:', data);
                setUsername("");
                setPassword("");
            }
        } catch (error) {
            console.error('There was an error during login:', error);
        }
    }
    return (
        <>
        <form onSubmit={handleCreateAccount}>
            <h2>Create Account</h2>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <div>
                <label htmlFor="username">Username:</label>
                <br></br>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <br></br>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Create Account</button>
        </form>
        {error && <p className="error">{error}</p>}
        </>
    )
}