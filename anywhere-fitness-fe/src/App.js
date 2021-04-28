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

  const loginPage = useRouteMatch("/login")
  const homePage = useRouteMatch({
    path: '/',
    exact:true
  });

  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  console.log(localStorage)
  const history = useHistory();

  return (
    <div>
      <header className="App-header">
        <nav>
          <h1>Anywhere Fitness</h1>
          <div>
          <Link to="/">Home</Link>
            {token ?
            <div>
             <Link to='/profile' >Profile</Link>
             {
               userRole === 'Instructor' ? (
                 <>
                  <Link to="/create" >Create Class</Link>
                  <Link to="/classes" >Class List</Link> 
                </>
                ) : 
                <Link to="/classes" >Class List</Link>
             }
             <button onClick={()=> {
              logout()
              history.push('/')
             }} >Logout</button>
             </div>
             : homePage ?<div>
             <Link to='/login'><button>Login</button></Link>
             <Link to='/register'><button>Register</button></Link>
             </div>
             : loginPage ? <Link to='/register'><button>Register</button></Link>
             : <Link to='/login'><button>login</button></Link>
            }
            {
              isSignedIn && (
                <div>
                  <Link to='/profile' >Profile</Link>
              {
                userRole === 'Instructor' ? (
                <Link to="/create" >Create Class</Link> ) : 
                <Link to="/classes" >Class List</Link>
              }
              </div>
              )
            }
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

export default App
