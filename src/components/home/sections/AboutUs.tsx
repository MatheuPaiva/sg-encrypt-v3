import React from 'react';
import { Users } from 'lucide-react';
import Carousel from '../../common/Carousel';

import equipe from '../../assets/equipe.jpg';
import evento1 from '../../assets/evento1.jpg';
import evento2 from '../../assets/evento2.jpg';
import ivetum from '../../assets/ivetum.jpg';
import logosiga from '../../assets/logosiga.png';
import startup from '../../assets/startup.jpg';


const AboutUs = () => {
  const carouselImages = [
    {
      url: equipe,
      alt: "Equipe trabalhando em tecnologia agrícola"
    },
    {
      url: evento1,
      alt: "Análise de dados agrícolas"
    },
    {
      url: evento2,
      alt: "Tecnologia no campo"
    },
    {
      url: ivetum,
      alt: "Foto de um evento agrícola"
    },
    {
      url: startup,
      alt: "Startup em ação"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center  text-yellow-500">Sobre Nós</h2>
        <div className="flex items-center justify-center mb-8">

        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="prose lg:prose-lg">
            <p className="text-lg text-gray-600">
              Somos uma empresa especializada em soluções tecnológicas para o setor financeiro, 
              focada em trazer inovação e eficiência para o campo através de ferramentas 
              avançadas de análise e diagnóstico.
            </p>
            <p className="text-lg text-gray-600">
              Nossa missão é transformar perícias e análises agricolas no mercado financeiro através da tecnologia, 
              proporcionando ferramentas inteligentes
              otimizar a produção e segurança das informações no campo.
            </p>
            <p className="text-lg text-gray-600">
              Uma Startup há 3 anos minerando informações no setor  agricola financeiro, 
              nosso comprometimento é impulsionar o futuro da financeiro da agricultura brasileira.
            </p>
          </div>
          
          <div className="order-first md:order-last">
            <Carousel images={carouselImages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;