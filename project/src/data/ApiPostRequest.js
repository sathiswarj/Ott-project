import { ApiEndPoint } from "./ApiEndPoint";

export const ApiPostRequest = {
signup: async ({ username, email, password }) => {
    try {
        const response = await fetch(
            `${ApiEndPoint.corePath}/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, email, password })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
},

    login: async ( { email, password}) => {
        try {
            const response = await fetch(
                `${ApiEndPoint.corePath}/login`,
                {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error.message;
        }
    },

    addMovie: async (movieData) => {
                    const token = localStorage.getItem("usertoken");

        try {
            const response = await fetch(
                `${ApiEndPoint.corePath}/movies`,
                {
                    method: 'POST',
                    headers: {
                   "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieData)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error.message;
        }
    },

    editMovie: async (movieData,movieId) => {
                    const token = localStorage.getItem("usertoken");

        try {
            const response = await fetch(
                `${ApiEndPoint.corePath}/movies/${movieId}`,
                {
                    method: 'PUT',
                    headers: {
                   "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieData)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error.message;
        }
    },
      deleteMovie: async (movieId) => {
                    const token = localStorage.getItem("usertoken");

        try {
            const response = await fetch(
                `${ApiEndPoint.corePath}/movies/${movieId}`,
                {
                    method: 'DELETE',
                    headers: {
                   "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                 }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error.message;
        }
    },
     
};

