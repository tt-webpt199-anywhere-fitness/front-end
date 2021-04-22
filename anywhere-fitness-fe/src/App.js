import './App.css';
import HomePage from './components/HomePage';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route exact path = "/"/>
      <HomePage />
      <Route/>
      
    </div>
  );
}

export default App;
