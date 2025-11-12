import { useState } from 'react';
import { Home, Briefcase, Menu } from 'lucide-react';
import { supabase } from './lib/supabase';
import ConfirmationPage from './ConfirmationPage';
import DeliveryDatePage from './DeliveryDatePage';
import PaymentPage from './PaymentPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'form' | 'confirmation' | 'delivery' | 'payment'>('form');
  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    complemento: '',
    informacoes: '',
    semNumero: false,
    tipoEndereco: 'casa',
    nomeCompleto: '',
    telefone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('addresses')
      .insert([{
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento,
        informacoes: formData.informacoes,
        sem_numero: formData.semNumero,
        tipo_endereco: formData.tipoEndereco,
        nome_completo: formData.nomeCompleto,
        telefone: formData.telefone,
        cidade: formData.cidade,
        bairro: formData.bairro,
        estado: formData.estado
      }]);

    if (!error) {
      setCurrentPage('confirmation');
    } else {
      console.error('Error saving address:', error);
    }
  };

  const handleBack = () => {
    setCurrentPage('form');
  };

  const handleContinue = () => {
    setCurrentPage('delivery');
  };

  const handleBackToConfirmation = () => {
    setCurrentPage('confirmation');
  };

  const handleContinueToPayment = () => {
    setCurrentPage('payment');
  };

  const handleBackToDelivery = () => {
    setCurrentPage('delivery');
  };

  if (currentPage === 'confirmation') {
    return <ConfirmationPage formData={formData} onBack={handleBack} onContinue={handleContinue} />;
  }

  if (currentPage === 'delivery') {
    return <DeliveryDatePage formData={formData} onBack={handleBackToConfirmation} onContinue={handleContinueToPayment} />;
  }

  if (currentPage === 'payment') {
    return <PaymentPage onBack={handleBackToDelivery} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#FFE600] px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <img src="/Screenshot_261.png" alt="Mercado Livre" className="w-12 h-12" />
        </div>
        <button className="p-1">
          <Menu className="w-5 h-5 text-gray-800" strokeWidth={2} />
        </button>
      </header>

      {/* Conteúdo principal */}
      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Adicione um endereço</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CEP */}
          <div>
            <label htmlFor="cep" className="block text-sm font-medium text-gray-900 mb-2">
              CEP
            </label>
            <div className="relative">
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="Ex.: 05410001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium hover:underline"
              >
                Não sei meu CEP
              </button>
            </div>
          </div>

          {/* Rua / Avenida */}
          <div>
            <label htmlFor="rua" className="block text-sm font-medium text-gray-900 mb-2">
              Rua / Avenida
            </label>
            <input
              type="text"
              id="rua"
              name="rua"
              value={formData.rua}
              onChange={handleInputChange}
              placeholder="Ex.: Avenida los Leones, 4563"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          {/* Número */}
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-900 mb-2">
              Número
            </label>
            <div className="relative">
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="Ex.: 45607052"
                disabled={formData.semNumero}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:text-gray-500"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <label htmlFor="semNumero" className="text-sm text-gray-700 cursor-pointer">
                  Sem número
                </label>
                <input
                  type="checkbox"
                  id="semNumero"
                  name="semNumero"
                  checked={formData.semNumero}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Bairro */}
          <div>
            <label htmlFor="bairro" className="block text-sm font-medium text-gray-900 mb-2">
              Bairro
            </label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              placeholder="Ex.: Centro"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          {/* Cidade */}
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-900 mb-2">
              Cidade
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              placeholder="Ex.: São Paulo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-900 mb-2">
              Estado
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              placeholder="Ex.: SP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          {/* Complemento */}
          <div>
            <label htmlFor="complemento" className="block text-sm font-medium text-gray-900 mb-2">
              Complemento (opcional)
            </label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
              placeholder="Ex.: 201"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          {/* Informações adicionais */}
          <div>
            <label htmlFor="informacoes" className="block text-sm font-medium text-gray-900 mb-2">
              Informações adicionais deste endereço (opcional)
            </label>
            <textarea
              id="informacoes"
              name="informacoes"
              value={formData.informacoes}
              onChange={handleInputChange}
              placeholder="Ex.: Entre ruas, cor do edifício, não tem campainha."
              rows={4}
              maxLength={128}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.informacoes.length} / 128
            </div>
          </div>

          {/* Tipo de endereço */}
          <div>
            <p className="text-sm font-medium text-gray-900 mb-4">
              Este é o seu trabalho ou sua casa?
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="tipoEndereco"
                  value="casa"
                  checked={formData.tipoEndereco === 'casa'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Home className="w-5 h-5 text-gray-700" />
                <span className="text-base text-gray-900">Casa</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="tipoEndereco"
                  value="trabalho"
                  checked={formData.tipoEndereco === 'trabalho'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Briefcase className="w-5 h-5 text-gray-700" />
                <span className="text-base text-gray-900">Trabalho</span>
              </label>
            </div>
          </div>

          {/* Dados de contato */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Dados de contato</h2>
            <p className="text-sm text-gray-600 mb-6">
              Se houver algum problema no envio, você receberá uma ligação neste número.
            </p>

            {/* Nome e sobrenome */}
            <div className="mb-6">
              <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-900 mb-2">
                Nome e sobrenome
              </label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>

            {/* Telefone de contato */}
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-900 mb-2">
                Telefone de contato
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Rodapé com botão Salvar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium text-base hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default App;
