const API_URL = import.meta.env.VITE_API_URL || 'https://food-order-app-backend-hz0d.onrender.com/api';

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return await response.json();
};

export const updateUser = async (formData) => {
    const response = await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
    }
    return await response.json();
};

