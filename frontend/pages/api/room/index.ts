import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../../src/database/conn";
import { Request, Response } from 'express'; // Import the types from @types/express
import { getAllRooms, createRoom } from '../../../src/controllers/room.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
  } catch (err) {
    return res.status(400).json({ error: "Database connection error" });
  }

  switch (req.method) {
    case 'GET':
      await getAllRooms(req as unknown as Request, res as unknown as Response);
      break;
    case 'POST':
      await createRoom(req as unknown as Request, res as unknown as Response);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(400).json({ error: `Method ${req.method} not allowed` });
  }
}
