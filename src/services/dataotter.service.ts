'use server';

type DataOtterMonitor = {
  'monitor id': number;
  'date recorded': string;
  milliseconds: number;
  status: boolean;
  attempts: number;
  'status code': number;
}
export type DataOtterApplication = {
  id: number;
  name: string;
  description: string;
  'monitor ids': number[];
  tags: string[];
  status: boolean;
  'monitor statuses': DataOtterMonitor[]
}

export type DataOtterDeviceStatus = {
  id: number;
  name: string;
  os: string;
  status?: {
    date: string;
    'memory usage': number;
    'cpu usage': number;
    'disk usage': number;
    'agent version': string;
  };
}

export async function getDataOtterApplication(id: number): Promise<DataOtterApplication | undefined>{
  const query = new URLSearchParams({
    'include-status': 'true'
  }).toString();

  const response = await fetch(`http://monitoring.zgamelogic.com:8080/applications/${id}?${query}`, {
    method: 'GET',
    next: { revalidate: 60 }
  });

  if(!response.ok) return undefined;

  return await response.json();
}

export async function getAllApplications(): Promise<DataOtterApplication[]> {
  try {
    const query = new URLSearchParams({
      'include-status': 'true'
    }).toString();

    const response = await fetch(`http://monitoring.zgamelogic.com:8080/applications?${query}`, {
      method: 'GET',
      next: { revalidate: 60 }
    });

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as DataOtterApplication[]) : [];
  } catch {
    return [];
  }
}

export async function getDataOtterDevices(): Promise<DataOtterDeviceStatus[]> {
  try {
    const query = new URLSearchParams({
      'include-status': 'true'
    }).toString();

    const response = await fetch(`http://monitoring.zgamelogic.com:8080/agents?${query}`, {
      method: 'GET',
      next: { revalidate: 60 }
    });

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? (data as DataOtterDeviceStatus[]) : [];
  } catch {
    return [];
  }
}
