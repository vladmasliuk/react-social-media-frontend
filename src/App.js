import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom';

// Libs
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTH } from './redux/types';
import { exitUs, getUserData } from './redux/redux-actions/userAc';

// Pages
import homePage from './pages/homePage';
import loginPage from './pages/loginPage';
import registrationPage from './pages/registrationPage';
import allUsersPage from './pages/allUsersPage';
import userPage from './pages/userPage';
import contactPage from './pages/contactPage';
import notFoundPage from './pages/notFoundPage';

// Components
import Sidebar from './components/Sidebar/Sidebar';

// Routes
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from './breakpoint/breakpoint';

// proxy
axios.defaults.baseURL = 'https://us-central1-react-social-a3a4f.cloudfunctions.net/api';

// expire session token
const token = localStorage.FireToken;
if (token) {
  const deToken = jwtDecode(token);
  if (deToken.exp * 1000 < Date.now()) {
    store.dispatch(exitUs());
    window.location.href = '/#/login';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store = {store}>
      <HashRouter>
        <AppContainer>
          <Sidebar/>
          <Switch>
            {/* private routes */}
            <PrivateRoute exact path="/" component={homePage} />
            <PrivateRoute exact path="/users" component={allUsersPage} />
            <PrivateRoute exact path="/users/:name" component={userPage}/>
            <PrivateRoute exact path="/users/:name/post/:postId" component={userPage}/>
            {/* public routes */}
            <PublicRoute exact path="/login" component={loginPage} />
            <PublicRoute exact path="/registration" component={registrationPage} />
            {/* not found */}
            <Route exact path="/contact" component={contactPage}/>
            <Route path="" component={notFoundPage}/>
          </Switch>
        </AppContainer>
      </HashRouter>
    </Provider>
  );
}

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 290px 1fr;
  @media ${breakpoint.device.laptop}{
    grid-template-columns: 200px 1fr;
  }
  @media ${breakpoint.device.tablet}{
    display: block;
  }
`;

export default App;