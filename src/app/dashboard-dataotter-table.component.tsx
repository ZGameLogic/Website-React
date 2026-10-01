'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {DataOtterApplication} from '@/src/services/dataotter.service.ts';
import {Chip} from '@mui/material';

type DashboardDataotterTableProps = {
  applicationData: DataOtterApplication[]
}

export default function DashboardDataotterTable({ applicationData }: DashboardDataotterTableProps){
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Application Name',
      width: 200
    }, {
      field: 'status',
      headerName: 'Status',
      width: 100,
      align: 'center',
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

  return <DataGrid rows={applicationData} columns={columns} />;
}
