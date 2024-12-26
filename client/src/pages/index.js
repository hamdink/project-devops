import LoginPage from './pages/login';
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Home = () =>  <LoginPage />
Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
