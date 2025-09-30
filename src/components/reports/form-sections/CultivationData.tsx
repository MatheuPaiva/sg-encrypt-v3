import React from 'react';

interface CultivationDataProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CultivationData: React.FC<CultivationDataProps> = ({ formData, onChange }) => (
  <div className="space-y-4 mt-8">
    <h3 className="text-lg font-semibold text-gray-800">3. Dados sobre o Cultivo</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Cultura</label>
        <select
          name="cropType"
          value={formData.cropType || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecione o tipo de cultura</option>
          <option value="soja">Soja</option>
          <option value="milho">Milho</option>
          <option value="cafe">Café</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Estágio de Desenvolvimento</label>
        <select
          name="developmentStage"
          value={formData.developmentStage || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecione o estágio</option>
          <option value="plantio">Plantio</option>
          <option value="crescimento">Crescimento</option>
          <option value="colheita">Colheita</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Densidade de Plantio (plantas/ha)</label>
        <input
          type="text"
          inputMode="numeric"
          name="plantingDensity"
          value={formData.plantingDensity ?? ''}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '');
            onChange({ target: { name: 'plantingDensity', value: digits } } as React.ChangeEvent<HTMLInputElement>);
          }}
          pattern="\d*"
          title="Somente números"
          placeholder="Somente números"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Método de Cultivo</label>
        <select
          name="cultivationMethod"
          value={formData.cultivationMethod || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecione o método</option>
          <option value="convencional">Convencional</option>
          <option value="organico">Orgânico</option>
          <option value="integrado">Integrado</option>
        </select>
      </div>
    </div>
  </div>
);

export default CultivationData;