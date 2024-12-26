import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from 'src/@core/context/userContext';
import CircularProgress from '@mui/material/CircularProgress';

function RequireAuth({ children }) {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null && router.pathname !== '/pages/login') {
      router.replace('/pages/login');
    }
  }, [user, isLoading, router]);
  

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!user) {
    return null;
  }

  return children;
}

export default RequireAuth;
