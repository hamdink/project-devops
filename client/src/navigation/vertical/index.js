/* eslint-disable padding-line-between-statements */
/* eslint-disable import/newline-after-import */
import React, { useContext } from 'react'
import { UserContext } from 'src/@core/context/userContext'

// ** Icon imports
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import MessageIcon from '@mui/icons-material/Message'
import GroupIcon from '@mui/icons-material/Group'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
const Navigation = () => {
  const { user } = useContext(UserContext)
  const isAdmin = user && user.role === 'Admin'

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },

    {
      sectionTitle: 'Admin Interface'
    },

    /* {
      title: 'Who Are We?',
      icon: CreditCardOutline,
      path: '/who-we-are',
      hidden: !isAdmin
    }, */
    /* {
      title: 'Our Featured Projects',
      icon: Table,
      path: '/featured-Project',
      hidden: !isAdmin
    }, */
    // {
    //   title: 'Services',
    //   icon: Table,
    //   path: '/what-we-do'
    // },
    {
      icon: LibraryAddIcon,
      title: 'Partner',
      path: '/our-partners'
    },
    {
      icon: GroupIcon,
      title: 'Reservations',
      path: '/our-reservations'
    },
    {
      icon: GroupIcon,
      title: 'Clients Reviews',
      path: '/our-reviews'
    },
    {
      icon: GroupIcon,
      title: 'Recent blogs',
      path: '/our-blogs'
    },
    {
      icon: GroupIcon,
      title: 'Faqs',
      path: '/faqs'
    },
    {
      icon: MessageIcon,
      title: 'Contact',
      path: '/messages'
    }
  ]

  const filteredNavigation = navigationItems.filter(item => !item.hidden)

  return filteredNavigation
}

export default Navigation
