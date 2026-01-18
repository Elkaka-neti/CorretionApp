
import { Outlet } from 'react-router-dom';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

export function MainLayout() {
  return (
    <div>
      <header className="p-4 mb-5 flex-col items-center justify-center text-center">
        <h1>Corretor de Redações</h1>
        <div className="w-full flex justify-between">
          <button className="bg-gray-900 rounded-md p-3 font-bold text-white flex hover:bg-orange-200"><p>Avançar</p> <CircleChevronRight /></button>
          <button className='bg-gray-900 rounded-md p-3 font-bold text-white flex hover:bg-orange-200'><CircleChevronLeft /> <p>Voltar</p></button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      <footer className='fixed bottom-0 left-0 w-full items-center justify-center flex '>
      {/* <button className="w-[90%] p-5 bg-black rounded-3xl mb-3 flex items-center justify-center text-center text-white font-bold"> Teste </button>*/}
     
      </footer>
    </div>
  );
}