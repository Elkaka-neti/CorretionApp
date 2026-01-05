
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import {Home} from '@/pages/Home';
import {Editr} from '@/pages/Editor';
import {NotFound} from '@/pages/NotFound';
import '@/index.css';
import { GlobalContextProvider } from './contexts/GlobalContext';
import NorthTexts from './pages/NorthTexts';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
          <Route path="nova-redacao" element={<Editr />} />
          <Route path="referencias" element={ <NorthTexts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
} 