import { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';

interface DeliveryDatePageProps {
  formData: {
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    informacoes: string;
    semNumero: boolean;
    tipoEndereco: string;
    nomeCompleto: string;
    telefone: string;
    cidade: string;
    bairro: string;
    estado: string;
  };
  onBack: () => void;
  onContinue: () => void;
}

function DeliveryDatePage({ formData, onBack, onContinue }: DeliveryDatePageProps) {
  const [selectedDay, setSelectedDay] = useState('segunda-terca');

  const formatarEnderecoSimples = () => {
    return `${formData.rua} ${formData.numero || ''}`;
  };

  const deliveryDays = [
    { id: 'segunda-terca', label: 'Entre Segunda-feira e Terça-feira' }
  ];

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col">
      <header className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-xl font-normal text-gray-900">Escolha quando sua compra chegará</h1>
      </header>

      <div className="px-4 py-4">
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700">Envio para {formatarEnderecoSimples()}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base font-medium text-gray-900">Envio 1</span>
            </div>

            <div className="space-y-3">
              {deliveryDays.map((day) => (
                <label
                  key={day.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryDay"
                      value={day.id}
                      checked={selectedDay === day.id}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-base text-gray-900">{day.label}</span>
                  </div>
                  <span className="text-base text-green-600 font-medium">Grátis</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base text-gray-900">Frete</span>
          <span className="text-base text-green-600 font-medium">Grátis</span>
        </div>
        <button onClick={onContinue} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-base py-3.5 rounded-lg transition-colors">
          Continuar
        </button>
      </div>
    </div>
  );
}

export default DeliveryDatePage;
