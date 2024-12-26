import { useEffect, useContext,useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from 'src/@core/context/userContext';
import { CircularProgress } from '@mui/material';

function RequireAdmin({ children }) {
  const { user,isLoading } = useContext(UserContext);
  const router = useRouter();


  useEffect(() => {
    if (!isLoading && (user === null/*  || user.role !== 'Admin' */)) {
      router.replace('/pages/error/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <CircularProgress />;
  }


  if (!user /* || user.role !== 'Admin' */) {
    return null;
  }

  return children;
}

export default RequireAdmin;
