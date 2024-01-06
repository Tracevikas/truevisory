// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { getCookie } from 'utils/Cookie';


const App = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || '';
  useEffect(() => {
    const token = getCookie('token');
    if (token != '' && window.location.href === `${baseUrl}/login`) {
      window.location = baseUrl
    } else if (token == '' && window.location.href != `${baseUrl}/login`) {
      window.location = `${baseUrl}/login`
    }
  }, [])
  return <ThemeCustomization>
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
}


export default App;
