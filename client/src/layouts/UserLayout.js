// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router';

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'


const UserLayout = ({ children }) => {


  // ** Hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const router = useRouter();





  const isLoginPage = router.pathname === '/';


  return (
    <>
    {!isLoginPage && ( // Ne rend le VerticalLayout que si ce n'est pas la page de login
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalNavItems={VerticalNavItems()}
        verticalAppBarContent={props => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
      </VerticalLayout>
    )}
    {isLoginPage ? children : null} {/* Rendre les enfants (page de login) si c'est la page de login */}
  </>
  )
}

export default UserLayout
