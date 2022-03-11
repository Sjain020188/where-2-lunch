import { Routes, Route } from 'react-router-dom';
import { Home } from './Views/Home';
import { Recommendation } from './Views/Recommendation';
import { Details } from './Views/Details';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recommendation" element={<Recommendation />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
