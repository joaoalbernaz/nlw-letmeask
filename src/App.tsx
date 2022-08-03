import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Toaster } from 'react-hot-toast';

import { 
  BrowserRouter, 
  Route,
  Routes
} from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";
import { Room } from "./pages/Room";

function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/rooms/new" element={ <NewRoom/> }/>
          <Route path="/rooms/:id" element={ <Room/> }/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
