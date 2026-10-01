'use server';

import { connectDatabase, db } from '@/src/prisma/db.ts';

export async function findAllDashboardProjects(){
  await connectDatabase();
  return db.orm.public.DashboardProjects
    .include('additionalProjectAspects')
    .include('dataotterApplicationLinks')
    .include('githubProjectLinks')
    .include('githubRepositoryLinks')
    .include('mavenProjectLinks')
    .all();
}