import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private userKey = 'authUser';
  private secretKey = 'your-secret-key'; // Choose a secure, unique key

  constructor() {}

  // Encrypt and store token
  setToken(token: string): void {
    const encryptedToken = CryptoJS.AES.encrypt(token, this.secretKey).toString();
    localStorage.setItem(this.tokenKey, encryptedToken);
  }
  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }
  getToken(): string | null {
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      try {
        const decryptedToken = CryptoJS.AES.decrypt(storedToken, this.secretKey).toString(CryptoJS.enc.Utf8);
        return decryptedToken;
      } catch (error) {
        console.error('Failed to decrypt token:', error);
        return null;
      }
    }
    return null;
  }

  // Clear token from storage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Encrypt and store username and password
  setLoginData(username: string, password: string): void {
    const loginData = { username, password };
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(loginData), this.secretKey).toString();
    localStorage.setItem(this.userKey, encryptedData);
  }

  // Retrieve and decrypt username and password
  getLoginData(): { username: string; password: string } | null {
    const storedData = localStorage.getItem(this.userKey);
    if (storedData) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(storedData, this.secretKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
      } catch (error) {
        console.error('Failed to decrypt login data:', error);
        return null;
      }
    }
    return null;
  }

  encryptPayload(payload: any): string {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), this.secretKey).toString();
    return ciphertext;
  }

  // Clear login data from storage
  clearLoginData(): void {
    localStorage.removeItem(this.userKey);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    this.clearToken();
    this.clearLoginData();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload.role; 
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  

}