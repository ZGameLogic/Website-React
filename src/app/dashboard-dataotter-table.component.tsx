'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  DataOtterApplication,
  DataOtterMonitorHistory,
  getMonitorHistoryData
} from '@/src/services/dataotter.service.ts';
import {Chip} from '@mui/material';
import {useEffect, useState} from 'react';

type DashboardDataotterTableProps = {
  applicationData: DataOtterApplication[]
}

export default function DashboardDataotterTable({ applicationData }: DashboardDataotterTableProps){
  const [monitorHistoryData, setMonitorHistoryData] = useState<DataOtterMonitorHistory[][]>([]);

  useEffect(() => {
    getMonitorHistoryData(applicationData).then(data => {
      setMonitorHistoryData(data);
    });
  }, [applicationData]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Application Name',
      width: 200
    }, {
      field: 'status',
      headerName: 'Status',
      width: 125,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const status = params.row.status;
        return <Chip
          size={'small'}
          color={status ? 'success' : 'error'}
          variant={'outlined'}
          label={status ? 'Up' : 'Down'}
        />;
      }
    }
  ];

  return <DataGrid
    rows={applicationData}
    columns={columns}
  />;
}
