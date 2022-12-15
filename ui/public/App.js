import Page from "./components/Page.js";
import { HashRouter as Router } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");
const element = /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(Page, null));
ReactDOM.render(element, document.getElementById("main")); // ReactDOM.render(<EmployeeDirectory />, document.getElementById('main'));
//   /* Student Id : 8759314 */