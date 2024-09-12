import InfoPage from './Components/InfoPage'; // Import from Components folder
import Loginpage from "./Components/Loginpage";
import Userhome from "./Components/Userhome";
import Adminhome from "./Components/Adminhome";
import { UseUserContext } from "./Hooks/UseUserContext";
import { UseAdminContext } from "./Hooks/UseAdminContext";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from "./Components/Signup";
import Forgotpass from "./Components/Forgotpass";
import Reset from "./Components/Reset";

function App() {
  const { User } = UseUserContext();
  const { Admin } = UseAdminContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Set InfoPage as the default ("/") route */}
          <Route path='/' element={<InfoPage />} />
          
          {/* Route to Loginpage */}
          <Route path='/login' element={!Admin && !User ? <Loginpage /> : <Navigate to='/Adminpage' />} />
          
          <Route path='/Adminpage' element={Admin ? <Adminhome/> : <Navigate to='/Userpage'/>}></Route>
          <Route path='/Userpage' element={User ? <Userhome/> :<Navigate to ='/'/>}></Route>
          <Route path='/User/Signup' element={!User ? <Signup /> :<Navigate to ='/'/>}></Route>
          <Route path='/User/forgotpass' element={!User ? <Forgotpass/> :<Navigate to ='/'/>}></Route>
          <Route path='/User/reset/:token' element={!User ? <Reset/> :<Navigate to ='/'/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
