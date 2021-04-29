import './App.css';
import {
	Route,
	Switch,
	Link,
	useHistory,
	useLocation,
	useRouteMatch,
} from 'react-router-dom';
import CourseList from './components/CourseList';
import Course from './components/Course';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreateCourse from './components/CreateClass';
import UserProfile from './components/UserProfileForm';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
	};

	const [isSignedIn, setisSignedIn] = useState(
		localStorage.getItem('id') ? true : false
	);

	const loginPage = useRouteMatch('/login');
	const homePage = useRouteMatch({
		path: '/',
		exact: true,
	});

	const token = localStorage.getItem('token');
	const userRole = localStorage.getItem('role');
	console.log(localStorage);
	const history = useHistory();

	return (
		<div>
			<header className="App-header">
				<nav>
					<h1 className="logo">
						Anywhere Fitness
					</h1>
					<div className="links">
						<Link to="/">
							Home
						</Link>
						{token ? (
							<div className="hidden-div">
								<Link to="/profile">
									Profile
								</Link>
								{userRole ===
								'Instructor' ? (
									<>
										<Link to="/create">
											Create
											Class
										</Link>
										<Link to="/classes">
											Class
											List
										</Link>
									</>
								) : (
									<Link to="/classes">
										Class
										List
									</Link>
								)}
								<button
									className="log-in-out"
									onClick={() => {
										logout();
										history.push(
											'/'
										);
									}}
								>
									Logout
								</button>
							</div>
						) : homePage ? (
							<div>
								<Link to="/login">
									<button className="log-in-out">
										Login
									</button>
								</Link>
								<Link to="/register">
									<button className="register-button">
										Register
									</button>
								</Link>
							</div>
						) : loginPage ? (
							<Link to="/register">
								<button className="register-button">
									Register
								</button>
							</Link>
						) : (
							<Link to="/login">
								<button className="log-in-out">
									login
								</button>
							</Link>
						)}
					</div>
				</nav>
			</header>
			<Switch>
				<ProtectedRoute
					exact
					path="/classes"
					component={CourseList}
				/>
				<ProtectedRoute
					exact
					path="/create"
					component={CreateCourse}
				/>
				<ProtectedRoute
					path="/profile"
					component={UserProfile}
				/>
				<Route
					path="/login"
					component={Login}
				/>
				<Route
					path="/register"
					component={Register}
				/>
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
