import React from 'react';

interface PropertyIdentificationProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PropertyIdentification: React.FC<PropertyIdentificationProps> = ({ formData, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">1. Identificação da Propriedade</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Proprietário</label>
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName || ''}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'\s]/g, '');
            onChange({ target: { name: 'ownerName', value: sanitized } } as React.ChangeEvent<HTMLInputElement>);
          }}
          pattern="[A-Za-zÀ-ÖØ-öø-ÿ'\s]+"
          title="Use apenas letras e espaços"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
        <input
          type="text"
          name="document"
          value={formData.document || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CEP</label>
        <input
          type="text"
          name="cep"
          value={formData.cep || ''}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/\D/g, '').slice(0, 8);
            onChange({ target: { name: 'cep', value: sanitized } } as React.ChangeEvent<HTMLInputElement>);
          }}
          inputMode="numeric"
          pattern="\d{8}"
          maxLength={8}
          placeholder="Somente números (8 dígitos)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome da Propriedade</label>
        <input
          type="text"
          name="propertyName"
          value={formData.propertyName || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Área Total (hectares)</label>
        <input
          type="text"
          inputMode="numeric"
          name="totalArea"
          value={formData.totalArea || ''}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/\D/g, '');
            onChange({ target: { name: 'totalArea', value: sanitized } } as React.ChangeEvent<HTMLInputElement>);
          }}
          pattern="\d*"
          placeholder="Somente números"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700">Endereço Completo</label>
      <textarea
        name="address"
        value={formData.address || ''}
        onChange={onChange}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default PropertyIdentification;