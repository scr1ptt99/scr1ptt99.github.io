import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Subject from "./pages/Subject";
import Nmt from "./pages/Nmt";
import Prices from "./pages/Prices";
import Reviews from "./pages/Reviews";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contacts from "./pages/Contacts";
import { Privacy, Terms } from "./pages/Legal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="predmety" element={<Subjects />} />
        <Route path="predmety/:slug" element={<Subject />} />
        <Route path="nmt" element={<Nmt />} />
        <Route path="tsiny" element={<Prices />} />
        <Route path="vidguky" element={<Reviews />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="kontakty" element={<Contacts />} />
        <Route path="konfidentsiynist" element={<Privacy />} />
        <Route path="umovy" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
