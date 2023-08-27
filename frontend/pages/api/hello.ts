import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../src/database/conn";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
    res.status(200).json({ name: 'John Doe' });
  } catch (err) {
    res.status(400).json({ error: "Database connection error" });
  }
}
