import { auth } from '@/auth';
import React from 'react'

export default async function  page() {
    const session = await auth();

    console.log(session.accessToken);
    
  return (
    <div>page</div>
  )
}
