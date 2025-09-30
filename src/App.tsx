import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { NotificationsProvider } from './contexts/NotificationsContext';

const Home = React.lazy(() => import('./components/home/Home'));
const ReportForm = React.lazy(() => import('./components/reports/ReportForm'));
const ReportViewer = React.lazy(() => import('./components/reports/ReportViewer'));
const Analytics = React.lazy(() => import('./components/analytics/Analytics'));
const Overview = React.lazy(() => import('./components/Overview'));
const MapView = React.lazy(() => import('./components/map/MapView'));
const ImageClassifier = React.lazy(() => import('./components/classificacao/ImageClassifier'));

function App() {
  return (
    <BrowserRouter>
      <NotificationsProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="reports/create" element={<ReportForm />} />
              <Route path="reports/view" element={<ReportViewer />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="map" element={<MapView />} />
              <Route path="classificacao" element={<ImageClassifier/>} />
            </Route>
          </Routes>
        </Suspense>
      </NotificationsProvider>
    </BrowserRouter>
  );
}

export default App;