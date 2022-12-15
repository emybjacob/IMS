import Page from "./components/Page.js";
import { HashRouter as Router } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

const element = (
  <Router>
      <Page/>
  </Router>
)

ReactDOM.render(element, document.getElementById("main"));

// ReactDOM.render(<EmployeeDirectory />, document.getElementById('main'));
//   /* Student Id : 8759314 */