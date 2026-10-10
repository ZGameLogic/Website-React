'use client';

import {PropsWithChildren, useEffect, useState} from 'react';
import {GlobalDataContext} from '@/src/global/global-data.context.ts';
import {DataOtterDeviceStatus, getDataOtterDevices} from "@/src/services/dataotter.service.ts";

export function GlobalDataProvider({children}: PropsWithChildren) {
  const [statuses, setStatuses] = useState<DataOtterDeviceStatus[]>([]);

  useEffect(() => {
    getDataOtterDevices().then(data => setStatuses(data));
  }, []);

  return <GlobalDataContext.Provider value={{
    dataOtter: {
      deviceStatuses: statuses
    }
  }}>{children}</GlobalDataContext.Provider>
}