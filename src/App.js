import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
import Header from './Pages/Shared/Header/Header';
import Blog from './Pages/Home/Blogs/Blogs';
import Footer from './Pages/Shared/Footer/Footer';
import Services from './Pages/Home/Services/Services';
import NotFound from './Pages/Shared/NotFound/NotFound';
import Login from './Pages/Home/Login/Login';
import About from './Pages/Home/About/About';
import ProtectedPage from './Pages/Home/ProtectedPage/ProtectedPage';
import Booking from './Pages/Home/Booking/Booking';
import Signup from './Pages/Home/Signup/Signup';
import { Toaster } from 'react-hot-toast';


function App() {
  
  return (
    <div className="App">
      <Header></Header>
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/services' element={<Services></Services>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/protected' element={
        <ProtectedPage>
          <Booking></Booking>
        </ProtectedPage>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
