import {Route, Routes} from 'react-router';

import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import NoteDetailPage from "./pages/NoteDetailPage.jsx"
import toast, { Toaster } from 'react-hot-toast';

//<button onClick={()=> toast.error("congrats")} className="text-red-950 p-4 bg-pink-400 bg">lcick me</button><Toaster/>

const App = () => {
  return (
    <div data-theme="forest">
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/note/:id" element={<NoteDetailPage />}/>
      </Routes>
    </div>
  );
};

export default App;