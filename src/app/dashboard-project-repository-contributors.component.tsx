import {GithubUser} from '@/src/services/github.service.ts';
import {Avatar, AvatarGroup, Tooltip} from '@mui/material';

export function DashboardProjectRepositoryContributors({contributors}: {contributors: GithubUser[]}){
 return <AvatarGroup
   max={15}
   sx={{ justifyContent: 'left' }}
   spacing={4}
   slotProps={{
     surplus: {
       sx: { width: 24, height: 24, fontSize: 12 }
     }
   }}
 >
   {contributors.map(cont => {
     return <Tooltip key={cont.id} title={cont.login} arrow >
       <Avatar sx={{width: 24, height: 24}} src={cont.avatar_url} />
     </Tooltip>
   })}
 </AvatarGroup>
}
