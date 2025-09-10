import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';
import { authService } from '../api/services';
import {
  LoginRequest,
  LoginResponse,
  User,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../api/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const {
    loading: loggingIn,
    error: loginError,
    execute: login,
  } = useApi<LoginResponse>(authService.login);

  const {
    loading: loggingOut,
    error: logoutError,
    execute: logout,
  } = useApi<void>(authService.logout);

  const {
    data: profile,
    loading: loadingProfile,
    error: profileError,
    execute: fetchProfile,
  } = useApi<User>(authService.getProfile);

  const {
    loading: updatingProfile,
    error: updateProfileError,
    execute: updateProfile,
  } = useApi<User>(authService.updateProfile);

  const {
    loading: changingPassword,
    error: changePasswordError,
    execute: changePassword,
  } = useApi<void>(authService.changePassword);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Update user when profile changes
  useEffect(() => {
    if (profile) {
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
    }
  }, [profile]);

  const handleLogin = useCallback(async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials);
      
      // Store token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  }, [login]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      
      // Clear stored data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      // Even if logout fails on server, clear local data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, [logout]);

  const handleUpdateProfile = useCallback(async (userData: Partial<User>) => {
    try {
      const updatedUser = await updateProfile(userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }, [updateProfile]);

  const handleChangePassword = useCallback(async (passwordData: ChangePasswordRequest) => {
    try {
      await changePassword(passwordData);
    } catch (error) {
      throw error;
    }
  }, [changePassword]);

  const refreshProfile = useCallback(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, fetchProfile]);

  return {
    // State
    user,
    isAuthenticated,
    token,
    
    // Loading states
    loggingIn,
    loggingOut,
    loadingProfile,
    updatingProfile,
    changingPassword,
    
    // Error states
    loginError,
    logoutError,
    profileError,
    updateProfileError,
    changePasswordError,
    
    // Actions
    login: handleLogin,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
    refreshProfile,
  };
}
