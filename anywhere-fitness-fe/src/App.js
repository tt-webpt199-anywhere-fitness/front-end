import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";

import CourseList from './components/CourseList'
import Course from "./components/Course";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h1>Anywhere Fitness</h1>
          <div>
            <Link to="/">Home</Link>
            <Link to="/classes" component={CourseList}>Class List</Link>
            <Link to="/create">Create</Link>
            {/* Create should only display for authenticated instructors */}
            <Link to="/profile">Profile</Link>
          </div>
        </nav>
      </header>
      <Switch>
        <ProtectedRoute exact path='/classes' component={CourseList} />
      </Switch>
    </div>
  );
}

export default App;
