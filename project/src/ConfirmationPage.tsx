import { ArrowLeft, ChevronRight } from 'lucide-react';

interface ConfirmationPageProps {
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

function ConfirmationPage({ formData, onBack, onContinue }: ConfirmationPageProps) {
  const formatarEndereco = () => {
    let endereco = `${formData.rua}`;
    if (!formData.semNumero && formData.numero) {
      endereco += ` ${formData.numero}`;
    }
    if (formData.bairro) {
      endereco += `, ${formData.bairro}`;
    }
    if (formData.cidade) {
      endereco += `, ${formData.cidade}`;
    }
    if (formData.cep) {
      endereco += ` - CEP ${formData.cep}`;
    }
    return endereco;
  };

  const getTipoEndereco = () => {
    return formData.tipoEndereco === 'casa' ? 'Residencial' : 'Trabalho';
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col">
      <header className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-xl font-normal text-gray-900">Confira a forma de entrega</h1>
      </header>

      <div className="flex-1 px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-base font-medium text-gray-900 mb-1">Enviar no meu endereço</h2>
                <p className="text-sm text-gray-700 mb-1">{formatarEndereco()}</p>
                <p className="text-sm text-gray-500">{getTipoEndereco()}</p>
              </div>
              <div className="ml-4">
                <span className="text-green-600 text-base font-medium">
                  Grátis
                </span>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="text-sm text-blue-600 font-normal">
              Alterar ou escolher outro endereço
            </span>
            <ChevronRight className="w-4 h-4 text-blue-600" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base text-gray-900">Frete</span>
          <span className="text-base text-green-600 font-medium">Grátis</span>
        </div>
        <button
          onClick={onContinue}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-base py-3.5 rounded-lg transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
