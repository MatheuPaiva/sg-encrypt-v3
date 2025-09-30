import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

// Declare tmImage type
declare const tmImage: any;

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/NmM_15Lh-/";

function ImageClassifier() {
  const [model, setModel] = useState<any>(null);
  const [predictions, setPredictions] = useState<Array<{ className: string; probability: number }>>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initModel();
  }, []);

  const initModel = async () => {
    try {
      setIsLoading(true);
      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    } catch (error) {
      console.error('Error loading model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !model) return;

    // Create an image element for prediction
    const image = new Image();
    image.src = URL.createObjectURL(file);
    setSelectedImage(image.src);

    image.onload = async () => {
      try {
        const predictions = await model.predict(image);
        setPredictions(predictions);
      } catch (error) {
        console.error('Error making prediction:', error);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Classificação de Doenças</h1>
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <p className="text-gray-600">Carregando modelos de IA preditivos...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-600">Envie uma image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {selectedImage && (
                <div className="mb-6">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {predictions.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Predições:</h2>
                  {predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="text-gray-700">{prediction.className}</span>
                      <span className="font-medium text-gray-900">
                        {(prediction.probability * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageClassifier;