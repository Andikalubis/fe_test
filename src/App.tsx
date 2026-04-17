import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { DetailsPage } from './pages/DetailsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
