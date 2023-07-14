import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Nav from "./components/Nav";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthContextProvider } from "./context/FakeAuthCtx";
import Login from "./pages/Login";
import { BooksContextProvider } from "./context/BooksContext";
import BookList from "./components/BookList";
import Book from "./components/Book";
import Form from "./components/Form";

function App() {
  return (
    <AuthContextProvider>
      <BooksContextProvider>
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
              <Route index element={<Navigate to="books" />} />
              <Route path="books" element={<BookList />} />
              <Route path="books/:bookId" element={<Book />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </BooksContextProvider>
    </AuthContextProvider>
  );
}

export default App;
