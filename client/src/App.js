import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AdvertsList from "./components/pages/AdvertsList/AdvertsList";
import SingleAdvert from "./components/pages/SingleAdvert/SingleAdvert";
import AddAdvert from "./components/pages/AddAdvert/AddAdvert";
import EditAdvert from "./components/pages/EditAdvert/EditAdvert";
import SearchResults from "./components/pages/SearchResults/SearchResults";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import NotFound from "./components/pages/NotFound/NotFound";
import Header  from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";

const App = () => {
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<AdvertsList />} />
          <Route path="/adverts/:id" element={<SingleAdvert />} />
          <Route path="/new" element={<AddAdvert />} />
          <Route path="/edit/:id" element={<EditAdvert />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
};

export default App;
