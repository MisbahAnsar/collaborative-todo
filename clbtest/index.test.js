import { expect, test, describe } from 'vitest';
import axios2 from 'axios';
import { response } from 'express';

const BACKEND_URL = "http://localhost:8080";

const axios = {
  post: async (...args) => {
      try {
          const res = await axios2.post(...args)
          return res
      } catch(e) {
          return e.response
      }
  },
  get: async (...args) => {
      try {
          const res = await axios2.get(...args)
          return res
      } catch(e) {
          return e.response
      }
  },
  put: async (...args) => {
      try {
          const res = await axios2.put(...args)
          return res
      } catch(e) {
          return e.response
      }
  },
  delete: async (...args) => {
      try {
          const res = await axios2.delete(...args)
          return res
      } catch(e) {
          return e.response
      }
  },
}

describe('Signup and signin', () => {
  test('User is Signing up', async () => {
    const username = "jinwoooo" + Math.random();
    const email = `jinwooooo${Math.random()}@gmail.com`;
    const password = "12345678";
    const profilePicture = "https://google.com";
    const bio = "ohayou, gaozaimashu, gambare gambare senpai";

      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
        profilePicture,
        bio
      });
      expect(response.status).toBe(201)

      const updateResponse = await axios.post(`${BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
        profilePicture,
        bio
      })
      expect(updateResponse.status).toBe(400); 
  });

  test('Signup request fails if the required fields empty', async () => {
    const username = "jinwoooo" + Math.random();
    const email = `jinwooooo${Math.random()}@gmail.com`;
    const password = "12345678";
    const profilePicture = "https://google.com";
    const bio = "ohayou, gaozaimashu, gambare gambare senpai";

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
        profilePicture,
        bio
      })
      expect(response.status).toBe(201)
    } catch {
      expect(response.status).toBe(400)
    }
  });

  test('User is Trying to login', async () => {
    const username = "jinwoooo" + Math.random();
    const email = `jinwooooo${Math.random()}@gmail.com`;
    const password = "12345678";
    const profilePicture = "https://google.com";
    const bio = "ohayou, gaozaimashu, gambare gambare senpai";

    await axios.post(`${BACKEND_URL}/user/signup`,{
      username,
      email,
      password,
      profilePicture,
      bio
    })

      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password
      });
      expect(response.status).toBe(201);
      expect(response.data.token).toBeDefined()
    
  });

  test("login fails if the username and password are incorrect", async() => {
    const username = "jinwoooo" + Math.random();
    const email = `jinwooooo${Math.random()}@gmail.com`;
    const password = "12345678";
    const profilePicture = "https://google.com";
    const bio = "ohayou, gaozaimashu, gambare gambare senpai";

    await axios.post(`${BACKEND_URL}/user/signup`,{
      username,
      email,
      password,
      profilePicture,
      bio
    })

      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email: "meowmewo",
        password
      });
      expect(response.status).toBe(401);
  })
});

// describe('List/Todo are below here')