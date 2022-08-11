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
import { AdminRoom } from "./pages/AdminRoom";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <div>
      <Toaster/>
      <BrowserRouter>
        <AuthContextProvider>
          <ThemeContextProvider>
            <Routes>
              <Route path="/" element={ <Home/> }/>
              <Route path="/rooms/new" element={ <NewRoom/> }/>
              <Route path="/rooms/:id" element={ <Room/> }/>
              <Route path="/admin/rooms/:id" element={ <AdminRoom/> }/>
            </Routes>
          </ThemeContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
