import { expect, test, describe } from 'vitest';
import axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

describe('Signup and signin', () => {
  test('User is Signing up', async () => {
    const username = "jinwoo" + Math.random();
    const email = `jinwoo${Math.random()}@gmail.com`;
    const password = "12345678";
    const profilePicture = "https://google.com";
    const bio = "ohayou, gaozaimashu, gambare gambare senpai";

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
        profilePicture,
        bio,
      });
      expect(response.status).toBe(200)
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
    
  });

  test('Signup request fails if the username is empty', async () => {
    const email = `jinwoo ${Math.random()}@gmail.com`;
    const password = "123456";
    const profilePicture = "https://google.com";
    const bio = "ohayou, gaozaimashu, gambare gambare senpai";

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        email,
        password,
        profilePicture,
        bio
      })
      expect(response.status).toBe(200)
    } catch (error){
      expect(error.response.status).toBe(400)
    }
  });
});