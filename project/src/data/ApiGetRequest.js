import { ApiEndPoint } from './ApiEndPoint'

export const ApiGetRequset = {
    getAllMovies: async () => {
        try {
            const token = localStorage.getItem("usertoken");
             
            if (!token) {
                throw new Error("No token found. Please login first.");
            }
            
            const response = await fetch(
                `${ApiEndPoint.corePath}/movies`,
                {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error response:", errorData); 
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    }
}