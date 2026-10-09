import {GithubUser} from '@/src/services/github.service.ts';
import {Avatar, AvatarGroup} from '@mui/material';

export function DashboardProjectRepositoryContributors({contributors}: {contributors: GithubUser[]}){
 return <AvatarGroup
   max={15}
   sx={{justifyContent: 'left'}}
   spacing={4}
   slotProps={{
     surplus: {
       sx: {width: 24, height: 24, fontSize: 12},
     },
   }}
 >
   {contributors.map(cont => (
     <Avatar
       key={cont.id}
       title={cont.login}
       aria-label={cont.login}
       sx={{width: 24, height: 24}}
       src={cont.avatar_url}
     />
   ))}
 </AvatarGroup>;
}
