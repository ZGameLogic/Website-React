'use client';

import {GithubRepositoryCommitActivity} from '@/src/services/github.service.ts';
import {Box, Divider, Typography} from '@mui/material';
import {LineChart} from '@mui/x-charts/LineChart';

export default function RepositoryCommitStats({stats}: {stats: GithubRepositoryCommitActivity[]}){
  return <>
    {stats.length > 0 && <>
      <Divider textAlign="left" sx={{ mt: 1 }}>
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.68rem'
        }}>Commit Activity</Typography>
      </Divider>
      <Box sx={{ height: 20, display: 'flex', mt: 0.5, overflow: 'hidden'}}>
        <LineChart
          height={40}
          series={[
            {
              data: stats.map(activity => activity.total),
              curve: 'linear',
              showMark: false,
              color: '#3f934b',
            },
          ]}
          xAxis={[{ data: stats.map((_, index) => index) }]}
          margin={{ top: 0, right: 0, bottom: 0, left: -45 }}
          slotProps={{ tooltip: { trigger: 'none' } }}
          axisHighlight={{ x: 'none', y: 'none' }}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 2,
            },
            '& .MuiChartsAxis-bottom': { display: 'none' },
            '& .MuiChartsAxis-left': { display: 'none' },
            '& .MuiChartsGrid-root': { display: 'none' },
          }}
        />
      </Box>
    </>}
  </>;
}