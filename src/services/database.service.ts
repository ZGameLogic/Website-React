'use server';

import { connectDatabase, db } from '@/src/prisma/db.ts';
import { cacheLife } from 'next/cache'

export async function findAllDashboardProjects(){
  'use cache';
  cacheLife('hours');

  await connectDatabase();
  return db.orm.public.DashboardProjects
    .include('additionalProjectAspects')
    .include('dataotterApplicationLinks')
    .include('githubProjectLinks')
    .include('githubRepositoryLinks')
    .include('mavenProjectLinks')
    .all();
}