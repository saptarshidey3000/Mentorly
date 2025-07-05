import express from "express"
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

dotenv.config();
const router = express.Router();
const DAILY_API_KEY = process.env.DAILY_API_KEY;

router.post('/create-room', async (req, res) => {
  const roomName = `room-${uuidv4()}`;

  try {
    const response = await axios.post(
      'https://api.daily.co/v1/rooms',
      {
        name: roomName,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      roomName: response.data.name,
      roomUrl: response.data.url,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

export default router;