"use server";

import { fetchUser } from '@/actions'
import Logout from '@/components/logout/index';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const currentUser = await fetchUser();
  const user = currentUser?.data;
  if(!currentUser?.success) redirect('/sign-in');

  return (
    <div>
        Welcome to nextJS Auth and middleware
        <h2>{user?.name}</h2>
        <h4>{user?.email}</h4>
        <Logout/>
    </div>
  )
}
