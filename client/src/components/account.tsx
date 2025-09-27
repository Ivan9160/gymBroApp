import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function Account() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null); // Створити стан для даних користувача

    useEffect(() => {
        if (!userId) return;
        const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error("Failed to fetch user data:", error);
            });
    }, [userId]);
    return (
        <div className="container">
            <h1>Account</h1>
            <div>User ID: {userData}</div>
            <Link to='/exercise'>Create exercise</Link>
        </div>
    )
}

export default Account;