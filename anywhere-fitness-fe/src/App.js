import './App.css';
import { Route, Switch, Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import CourseList from './components/CourseList';
import Course from "./components/Course";
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import CreateCourse from './components/CreateClass';
import UserProfile from './components/UserProfileForm';
import { useState } from 'react';



function App() {

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  };

  const [isSignedIn, setisSignedIn] = useState(
		localStorage.getItem('id') ? true : false
	);

  const userRole = localStorage.getItem('role')
  console.log(userRole)

  const loginPage = useRouteMatch("/login")

  return (
    <div>
      <header className="App-header">
        <nav>
          <h1>Anywhere Fitness</h1>
          <div>
            <Link to="/">Home</Link>
            {
              isSignedIn && (
                <div>
              {
                userRole === 'Instructor' ? (
                <Link to="/create" >Create Class</Link> ) : 
                <Link to="/classes" >Class List</Link>
              }
              </div>
              )
            }
            <Link to="/profile">Profile</Link>
            <div>
              {
                loginPage ? <Link to= "/register"><button> Register </button></Link> : <></>
              }
              {
                isSignedIn ? (
                <Link to='/' onClick={logout} to='/'><button>Sign Out</button></Link> ) :
                <Link to='/login' ><button>Log In</button></Link>
              }
            </div>
          </div>
        </nav>
      </header>
      <Switch>
        <ProtectedRoute exact path='/classes' component={CourseList} />
        <ProtectedRoute exact path='/create' component={CreateCourse} />
        <ProtectedRoute path='/profile' component={UserProfile} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
