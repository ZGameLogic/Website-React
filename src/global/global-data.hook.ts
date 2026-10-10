'use client';

import {useContext} from 'react';
import {GlobalDataContext} from '@/src/global/global-data.context.ts';

export function useGlobalData(){
  return useContext(GlobalDataContext);
}