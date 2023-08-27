import ENV from '../../config.env';

interface ApiResponse {
  success: boolean;
  data: any; // Replace 'any' with the actual data type you expect the response to have.
}

export async function getAllRooms(): Promise<any[]> {
  const { success, data } = await (await fetch(`${ENV.BASE_URL}/room`)).json() as ApiResponse;
  if (!success) throw new Error('Error fetching rooms');
  return data;
}

export async function getMessages(roomid: string): Promise<any[]> {
  const { success, data } = await (await fetch(`${ENV.BASE_URL}/chat/${roomid}`)).json() as ApiResponse;
  if (!success) throw new Error('Error fetching messages');
  return data;
}

export async function createRoom(): Promise<any> {
  const { success, data } = await (await fetch(`${ENV.BASE_URL}/room`, {
    method: 'POST'
  })).json() as ApiResponse;
  if (!success) throw new Error('Error fetching room');
  return data;
}

export async function deleteRoom(roomid: string): Promise<any> {
  const { success, data } = await (await fetch(`${ENV.BASE_URL}/room/${roomid}`, {
    method: 'DELETE'
  })).json() as ApiResponse;
  if (!success) throw new Error('Error deleting room');
  return data;
}

interface SendMessageResponse {
  success: boolean;
  data: any; // Replace 'any' with the actual data type you expect the response to have.
}

export async function sendMessage({ roomid, message }: { roomid: string; message: string }): Promise<SendMessageResponse> {
  if (!roomid || !message) throw new Error("Invalid arguments");

  const { success, data } = await (await fetch(`${ENV.BASE_URL}/chat/${roomid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question: message })
  })).json() as ApiResponse;

  if (!success) throw new Error('Error sending message');
  return { success, data };
}
