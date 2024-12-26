import { useState, useEffect, Fragment  } from 'react';
import {markNotificationAsRead,deleteNotification,markAllNotificationsAsRead,getPaginatedNotifications } from 'src/pages/api/appConfig'
import socketIoClient from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import MessageIcon from '@mui/icons-material/Message';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import Badge from '@mui/material/Badge';

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme,isUnread }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75),
  color: isUnread ? 'darkred' : 'inherit',
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationMenu, setNotificationMenu] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [totalNotifications, setTotalNotifications] = useState(0);

 /*  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getPaginatedNotifications(page, pageSize);

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setNotifications((prevNotifications) => [...prevNotifications, ...data]);
          setTotalNotifications(data.length);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications :', error);
      }
    };
    fetchNotifications();
  }, [page, pageSize]); */

/*   useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const io = socketIoClient(`${API_BASE_URL}`);
    io.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });

    io.on('nouvelle_notification', (newNotification) => {

      const sortedNotifications = [newNotification, ...notifications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotifications(sortedNotifications);
    });

    const unreadNotifications = notifications.filter((notification) => !notification.isRead);

  setUnreadCount(unreadNotifications.length);

    return () => {
      io.disconnect();
    };
  }, [notifications]); */

  const handleNotificationClick = async (notification) => {
    try {

      await markNotificationAsRead(notification._id);
      if (notification.type === 'contact') {
        window.location.href = '/messages';
      } else if (notification.type === 'reservation') {
        window.location.href = '/reservations';
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification :', error);
    }
  };

  const handleMarkAsRead = async (notification) => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === notification._id ? { ...n, isRead: true } : n
        )
      );

      await markNotificationAsRead(notification._id);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification :', error);
    }
  };

  const handleMarkAllNotificationsAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification :', error);
    }
  };

  const handleOptionsClose = (notification) => {
    setNotificationMenu({
      ...notificationMenu,
      [notification._id]: null,
    });
  };

  const loadMoreNotifications = async () => {
    if (!hasMore) {return; }else {
      try {
        const newPage = page + 1;
        const response = await getPaginatedNotifications(newPage, pageSize);
        if (response.length === 0) {
          setHasMore(false);
        }
        else {
          setPage(newPage);
          setNotifications([...notifications, ...response]);
          setTotalNotifications((prevTotal) => prevTotal + response.length);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de plus de notifications :', error);
      }
    }
  };

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  };

  const handleDeleteNotification = async (notification) => {
    try {

       await deleteNotification(notification._id);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n._id !== notification._id)
      );
      handleOptionsClose(notification);
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification :', error);
    }
  };

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
      <Badge color="error" badgeContent={unreadCount}>
      <BellOutline />
            </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={unreadCount > 0 ? `New (${unreadCount})` : 'Nothing new'}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper >
        {notifications.map((notification,index) => (
        <MenuItem
          key={index}
          sx={{ backgroundColor: notification.isRead ? 'inherit' : '#f5f5f5' }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }} onClick={() => handleNotificationClick(notification)}>
            {notification.type === 'contact' ? (
              <MessageIcon />
            ) : (
              <BookOnlineIcon />
            )}
            <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
              <MenuItemTitle>{notification.content}</MenuItemTitle>
              <MenuItemSubtitle variant='body2'>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</MenuItemSubtitle>
            </Box>
          </Box>
      <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <Fragment>
          <IconButton variant="contained" {...bindTrigger(popupState)}>
          <MoreVertIcon />
          </IconButton>
          <Menu {...bindMenu(popupState)}
          sx={{width: '10rem'}}
  >
        <MenuItem onClick={() => handleDeleteNotification(notification)}>Delete</MenuItem>
        <MenuItem onClick={() => handleMarkAsRead(notification)}>Mark as Read</MenuItem>
          </Menu>
        </Fragment>
      )}
    </PopupState>
  </MenuItem>
          ))}
{hasMore && (
          <Button fullWidth variant='text' onClick={loadMoreNotifications}>
            Load More Notifications
          </Button>
        )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleMarkAllNotificationsAsRead}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
