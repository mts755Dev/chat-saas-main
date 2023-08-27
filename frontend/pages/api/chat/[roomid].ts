// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "../../../src/database/conn"
import { Request, Response } from 'express'; // Import the types from @types/express
import { getChat, createChat } from '../../../src/controllers/messages.controller'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connect().catch((err) => res.status(400).json({ error: "Database connection error" }))

  switch (req.method) {
    case 'GET':
      await getChat(req as unknown as Request, res as unknown as Response);
      break;
    case 'POST':
      await createChat(req as unknown as Request, res as unknown as Response)
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(400).json({ error: `Method ${req.method} not allowed` });
      break;
  }
}
