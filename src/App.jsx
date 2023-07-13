import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Nav from "./components/Nav";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthContextProvider } from "./context/FakeAuthCtx";
import Login from "./pages/Login";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="books" element={<p>List of books</p>} />
            <Route path="books/:bookId" element={<p>Individual book</p>} />
            <Route path="overview" element={<p>overview</p>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
