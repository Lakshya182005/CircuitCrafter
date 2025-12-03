"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

const AuthContext = createContext({
    user: null,
    loading: true,
    isAuthenticated: false,
    signup: async () => ({ success: false, error: 'Not initialized' }),
    login: async () => ({ success: false, error: 'Not initialized' }),
    googleLogin: async () => ({ success: false, error: 'Not initialized' }),
    logout: () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    // During SSR, context might be the default value, which is fine
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user on mount
    useEffect(() => {
        const loadUser = async () => {
            // Only run in browser
            if (typeof window === 'undefined') {
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await api.get('/api/auth/me');
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Failed to load user:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const signup = async (username, email, password) => {
        try {
            const data = await api.post('/api/auth/signup', { username, email, password }, { skipAuth: true });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            const data = await api.post('/api/auth/login', { email, password }, { skipAuth: true });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const googleLogin = async (credential) => {
        try {
            const data = await api.post('/api/auth/google', { credential }, { skipAuth: true });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        signup,
        login,
        googleLogin,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
