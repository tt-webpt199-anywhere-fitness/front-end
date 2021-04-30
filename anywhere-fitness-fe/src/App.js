import './App.css';
import {
	Route,
	Switch,
	Link,
	useHistory,
	useRouteMatch,
} from 'react-router-dom';
import CourseList from './components/CourseList';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreateCourse from './components/CreateClass';
import UserProfile from './components/UserProfileForm';
import Footer from './components/Footer';
import InstructorProfile from './components/InstructorProfileForm'

function App() {
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
	};


	const loginPage = useRouteMatch('/login');
	const homePage = useRouteMatch({
		path: '/',
		exact: true,
	});

	const setRoleComponent = (userType) => {
    if (userRole === 'Instructor' ) {
      return InstructorProfile
    } else if (userRole === 'User') {
      return UserProfile
    }
  }

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
						{token ? (
							<div className="links">
								<Link to="/">
									Home
								</Link>
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
									className="log-out"
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
							<div className="button-container">
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
					component={setRoleComponent(userRole)}
				/>
				<Route
					path="/login"
					component={Login}
				/>
				<Route
					path="/register"
					component={Register}
				/>
				<Route
					exact
					path="/"
					component={Home}
				/>
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
