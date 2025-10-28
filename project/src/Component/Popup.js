import React, { useState, useEffect } from 'react';
import { ApiPostRequest } from '../data/ApiPostRequest';

const EditMoviePopup = ({ onClose, movieData = null, isEdit = false }) => {
     const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [type, setType] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');

     const [errors, setErrors] = useState({});

     useEffect(() => {
        if (isEdit && movieData) {
            setTitle(movieData.title || '');
            setDirector(movieData.director || '');
            setType(movieData.type || '');
            setBudget(movieData.budget || '');
            setLocation(movieData.location || '');
            setDuration(movieData.duration || '');
            setYear(movieData.year || '');
            setGenre(movieData.genre || '');
        }
    }, [isEdit, movieData]);

    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) newErrors.title = 'Title is required';
        if (!director.trim()) newErrors.director = 'Director is required';
        if (!type) newErrors.type = 'Type is required';
        if (!duration) newErrors.duration = 'Duration is required';
        if (!year) newErrors.year = 'Year is required';
        if (!genre) newErrors.genre = 'Genre is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        alert('Please fill all required fields');
        return;
    }

    const moviePayload = {
        title: title.trim(),
        director: director.trim(),
        type,
        budget: budget ? Number(budget) : 0,
        location: location.trim(),
        duration: Number(duration),
        year: Number(year),
        genre
    };

   try {
    if (isEdit) {
        const response = await ApiPostRequest.editMovie(moviePayload, movieData._id);
        if (response?.success) {
            alert('Movie updated successfully!');
            onClose();
            window.location.reload();
        } else {
            throw new Error(response?.message || 'Unknown error');
        }
    } else {
        const response = await ApiPostRequest.addMovie(moviePayload);
        if (response?.success) {
            alert('Movie created successfully!');
            onClose();
            window.location.reload();
        } else {
            throw new Error(response?.message || 'Unknown error');
        }
    }
} catch (error) {
    console.error(`Error ${isEdit ? 'updating' : 'creating'} movie:`, error);
    alert(`Failed to ${isEdit ? 'update' : 'create'} movie: ${error.message}`);
}

};
    const handleReset = () => {
        if (isEdit && movieData) {
             setTitle(movieData.title || '');
            setDirector(movieData.director || '');
            setType(movieData.type || '');
            setBudget(movieData.budget || '');
            setLocation(movieData.location || '');
            setDuration(movieData.duration || '');
            setYear(movieData.year || '');
            setGenre(movieData.genre || '');
        } else {
             setTitle('');
            setDirector('');
            setType('');
            setBudget('');
            setLocation('');
            setDuration('');
            setYear('');
            setGenre('');
        }
        setErrors({});
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-lg relative max-h-[80vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6">
                    {isEdit ? 'Edit Movie' : 'Create New Movie'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Title *
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter movie title"
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs mt-1">{errors.title}</span>
                        )}
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Director *
                        <input
                            type="text"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            placeholder="Enter director name"
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                        {errors.director && (
                            <span className="text-red-500 text-xs mt-1">{errors.director}</span>
                        )}
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Type *
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 p-2 rounded mt-1"
                        >
                            <option value="">Select Type</option>
                            <option value="Movie">Movie</option>
                            <option value="TV Show">TV Show</option>
                        </select>
                        {errors.type && (
                            <span className="text-red-500 text-xs mt-1">{errors.type}</span>
                        )}
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Genre *
                        <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="border border-gray-300 p-2 rounded mt-1"
                        >
                            <option value="">Select Genre</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Animation">Animation</option>
                            <option value="Documentary">Documentary</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.genre && (
                            <span className="text-red-500 text-xs mt-1">{errors.genre}</span>
                        )}
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Duration (minutes) *
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Enter duration in minutes"
                            min="1"
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                        {errors.duration && (
                            <span className="text-red-500 text-xs mt-1">{errors.duration}</span>
                        )}
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Year *
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Enter release year"
                            min="1900"
                            max="2100"
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                        {errors.year && (
                            <span className="text-red-500 text-xs mt-1">{errors.year}</span>
                        )}
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Budget (optional)
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Enter budget amount"
                            min="0"
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                    </label>

                     <label className="flex flex-col text-sm font-semibold text-gray-700">
                        Location (optional)
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter filming location"
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                    </label>

                     <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            className="border border-gray-400 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        >
                            {isEdit ? 'Update Movie' : 'Add Movie'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMoviePopup;