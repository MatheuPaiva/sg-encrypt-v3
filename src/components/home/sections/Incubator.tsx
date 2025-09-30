import React from 'react';
import { Sprout } from 'lucide-react';
import Carousel from '../../common/Carousel';
import SprintLogo from '../../assets/sprintlogo.png';
import UTFPRLogo from '../../assets/utfprlogo.png';

import incubadora1 from '../../assets/incubadora1.jpg';
import incubadora2 from '../../assets/incubadora2.jpg';
import ideia from '../../assets/ideia-iut.png';
import santahelena from '../../assets/santahelena.jpg';
import logosiga from '../../assets/logosiga.png';
import frente from '../../assets/frente-iut.png'
import startup from '../../assets/startup.jpg';

const Incubator = () => {
  const carouselImages = [
    {
      url: incubadora1,
      alt: "Espaco Geral"
    },
    {
      url: incubadora2,
      alt: "Espaco Recepcao"
    },
    {
      url: ideia,
      alt: "Espaco Ideia"
    },
    {
      url: frente,
      alt: "Entrada Incubadora"
    },
    {
      url: santahelena,
      alt: "Santa Helena"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-600">Incubadora</h2>
        <div className="flex items-center justify-center mb-8 ">
        <img src={SprintLogo} alt="Sprint Logo" className=" w-40 h-40" />
    
        </div>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Projeto desenvolvido com o apoio da Sprint incubadora de empresas da UTFPR, 
          focando em inovação e desenvolvimento econômico para o agronegócio brasileiro.
        </p>
        
        <Carousel images={carouselImages} />
      </div>
    </section>
  );
};

export default Incubator;