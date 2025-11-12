import { ArrowLeft, ChevronRight } from 'lucide-react';

interface PaymentPageProps {
  onBack: () => void;
}

function PaymentPage({ onBack }: PaymentPageProps) {
  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col">
      <header className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-xl font-normal text-gray-900">Escolha como pagar</h1>
      </header>

      <div className="px-4 py-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <span className="text-base text-gray-900">Combinar 2 meios de pagamento</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900 mb-3 px-1">Recomendados</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0">
                <img src="/4611a564a1f84d6758472fe7e6483671.jpg" alt="Pix" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-medium text-gray-900">Pix</div>
                <div className="text-sm text-gray-500">Aprovação imediata</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-4 mt-auto">
        <div className="mb-4">
          <a href="#" className="text-[15px] text-blue-600 hover:underline font-normal">Inserir código do cupom</a>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[17px] text-gray-900 font-normal">Você pagará</span>
          <span className="text-[28px] font-normal text-gray-900 leading-none">R$ 129<sup className="text-[15px]">90</sup></span>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
