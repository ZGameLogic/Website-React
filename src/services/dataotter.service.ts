'use server';

import {cacheLife} from 'next/cache';

type DataOtterApplication = {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export async function getDataOtterApplication(id: number): Promise<DataOtterApplication>{
  'use cache';
  cacheLife('minutes');

  const query = new URLSearchParams({
    'include-status': 'true'
  }).toString();

  const response = await fetch(`http://44.223.51.243:8080/applications/${id}?${query}`, {
    method: 'GET'
  });
  
  if(!response.ok) return { description: '', id: 0, name: '', status: false }

  return await response.json();
}