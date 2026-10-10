'use client';

import {createContext} from 'react';
import {DataOtterDeviceStatus} from '@/src/services/dataotter.service.ts';

export type GlobalDataContextType = {
  dataOtter: {
    deviceStatuses: DataOtterDeviceStatus[];
  }
}

export const GlobalDataContext = createContext<GlobalDataContextType>({
  dataOtter: {
    deviceStatuses: []
  }
});