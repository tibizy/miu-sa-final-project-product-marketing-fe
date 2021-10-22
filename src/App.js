import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './pages';
import { Home as AffiliateHome } from './pages/affiliate';

function App() {
  return (
    <div>
      <Router>
        <Route path={['/affiliate']} component={AffiliateHome} />
        <Route path={['/store']} component={Home} />
        <Route path={['/']} component={Home} exact/>
      </Router>
    </div>
  );
}

export default App;
