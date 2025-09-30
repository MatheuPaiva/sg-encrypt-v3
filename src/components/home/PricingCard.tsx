import React from 'react';

interface PricingCardProps {
  title: string;
  price?: number;
  period?: string;
  features: string[];
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, features, highlighted }) => (
  <div className={`
    p-6 rounded-lg shadow-lg 
    ${highlighted ? 'bg-blue-50 border-blue-200' : 'bg-white'} 
    transform transition-transform hover:scale-105
  `}>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <span className="text-green-600 mr-2">•</span>
          {feature}
        </li>
      ))}
    </ul>
    {price ? (
      <p className="text-2xl font-bold text-green-600">
        R$ {price.toLocaleString('pt-BR')}
        <span className="text-sm font-normal text-green-400">{period}</span>
      </p>
    ) : (
      <p className="text-2xl font-bold text-yellow-500">Contate-nos</p>
    )}
  </div>
);

export default PricingCard;