import React, { useEffect, useState } from 'react';
import Aside from './aside';
import Main from './main';
import Loading from './loading';
import Banner from './banner';
import { useQuery } from 'react-query';
import { getAllRooms } from '../libs/request';
import axios from 'axios';
import { setCredentials } from '@/redux/slices/auth/AuthSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface Room {
  _id: string;
  name: string;
  messages: []
}

export function HomeScreen() {
  const [roomid, setRoomid] = useState<string | null>(null);
  const { isLoading, isError, data, error } = useQuery<Room[], Error>('rooms', getAllRooms);
  const dispatch = useDispatch();
  const router = useRouter();

  const getUser = async () => {
		try {
			const { data } = await axios.get("http://localhost:5000/api/users/google/success", { withCredentials: true });
      dispatch(setCredentials({ ...data }));
      router.push("/home");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	},[]);

  if (isLoading) return <Loading />;
  if (isError) return <div className='text-center'>Error : {error?.message}</div>;

  if (data && data.length === 0) {
    return (
      <div className='grid grid-cols-6'>
        <div className='bg-gray-900 col-span-1 aside z-10 text-gray-50'>
          <Aside getRooms={data} handler={setRoomid} />
        </div>
        <div className='bg-gray-800 text-gray-50 col-span-5 min-h-screen h-full mb-40'>
          <Banner />
        </div>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-6'>
      <div className='bg-gray-900 col-span-1 aside z-10 text-gray-50'>
        {data && <Aside getRooms={data} handler={setRoomid} />}
      </div>
      <div className='bg-gray-800 text-gray-50 col-span-5 min-h-screen h-full mb-40'>
        {roomid ? <Main roomid={roomid} /> : null}
      </div>
    </div>
  );
}
