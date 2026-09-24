import {connectDatabase, db} from "@/src/prisma/db.ts";
import {Typography} from "@mui/material";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDatabase();
  console.log(await db.orm.public.DashboardProjects.all());

  return <Typography>Bens Website</Typography>;
}
