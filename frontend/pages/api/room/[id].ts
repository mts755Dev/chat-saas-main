import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express'; // Import the types from @types/express
import connect from "../../../src/database/conn";
import { getRoom, deleteRoom } from '../../../src/controllers/room.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
  } catch (err) {
    return res.status(400).json({ error: "Database connection error" });
  }

  switch (req.method) {
    case 'GET':
      await getRoom(req as unknown as Request, res as unknown as Response); // Cast NextApiRequest to Request
      break;
    case 'DELETE':
      await deleteRoom(req as unknown as Request, res as unknown as Response); // Cast NextApiRequest to Request
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(400).json({ error: `Method ${req.method} not allowed` });
  }
}
