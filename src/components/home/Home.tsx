import React from 'react';
import { BookOpen } from 'lucide-react';
import PricingCard from './PricingCard';
import AboutUs from './sections/AboutUs';
import Incubator from './sections/Incubator';
import Newsletter from './sections/Newsletter';
import Logo from '../assets/logosiga.png';


const Home = () => {
  const pricingPlans = [
    {
      title: 'Plano Gratuito',
      features: ['Emissão de Relatórios'],
    },
    {
      title: 'Plano Básico',
      price: '',
      period: '/mês',
      features: [
        'Medição em área',
        'Análise de Relatórios Criados',
        'Controle de usuários',
        'Suporte a relatórios personalizáveis',
        'Histórico de inspeções'
      ],
      highlighted: true,
    },
    {
      title: 'Plano Premium',
      price: '',
      period: '/mês',
      features: [
        'ChatBot - Auxiliar',
        'IA - Classificação de doenças em plantas',
        'IA - Detecção de plantas daninhas',
        'IA - Contagem de Plantas',
        'Banco de dados de coordenadas',
        'Assinatura digital pelo ICP-Brasil',
        'Relatórios Auditáveis',
        'Treinamento e Consultoria',
        'Gestão dos níveis de Permissão'
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo SIGA" className=" w-50 h-50 rounded-full object-cover" />
            </div>
            <h1 className="text-4xl font-bold mb-6 text-green-500">Sistema de Inspenção Geografica Agrícola</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma completa para emissão de relatorios e análise de propriedades agrícolas, 
              oferecendo ferramentas avançadas para otimizar seus processos e 
              maximizar resultados fornecedno integridade, disponibilidade e segurança.
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <AboutUs />

      {/* Incubator Section */}
      <Incubator />

      {/* Pricing Plans Section */}
      <section className="py-16 bg-gray-50" id="plans">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-green-600">Nossos Planos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;