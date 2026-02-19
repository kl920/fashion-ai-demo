'use client';

import { useState } from 'react';
import axios from 'axios';
import { Upload, Sparkles, Download, Settings2, User, Image as ImageIcon } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [garmentFile, setGarmentFile] = useState<File | null>(null);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
  const [modelType, setModelType] = useState('female');
  const [pose, setPose] = useState('standing');
  const [background, setBackground] = useState('studio_white');
  const [style, setStyle] = useState('commercial');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGarmentFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGarmentPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!garmentFile) {
      setError('Please upload a garment image first');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const formData = new FormData();
      formData.append('garment_image', garmentFile);
      formData.append('model_type', modelType);
      formData.append('pose', pose);
      formData.append('background', background);
      formData.append('style', style);

      const response = await axios.post(`${API_URL}/generate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes timeout
      });

      if (response.data.success) {
        setGeneratedImage(response.data.image_url);
      } else {
        setError('Generation failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(
        err.response?.data?.detail || 
        err.message || 
        'Failed to generate image. Please check your API configuration.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fashion-ai-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Fashion AI Studio</h1>
                <p className="text-sm text-slate-600">AI-Powered Fashion Visualization</p>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Demo v1.0
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-slate-900">Upload Garment</h2>
              </div>
              
              <div className="space-y-4">
                <label className="block">
                  <div className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    garmentPreview 
                      ? 'border-primary-300 bg-primary-50' 
                      : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {garmentPreview ? (
                      <div className="space-y-2">
                        <img 
                          src={garmentPreview} 
                          alt="Garment preview" 
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-primary-600 font-medium">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <ImageIcon className="w-12 h-12 mx-auto text-slate-400" />
                        <p className="text-sm text-slate-600 font-medium">
                          Click to upload garment image
                        </p>
                        <p className="text-xs text-slate-500">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Model Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-slate-900">Model Settings</h2>
              </div>
              
              <div className="space-y-4">
                {/* Model Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Model Type
                  </label>
                  <select
                    value={modelType}
                    onChange={(e) => setModelType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="female">Female Model</option>
                    <option value="male">Male Model</option>
                    <option value="diverse">Diverse Model</option>
                  </select>
                </div>

                {/* Pose */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pose
                  </label>
                  <select
                    value={pose}
                    onChange={(e) => setPose(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="standing">Standing Straight</option>
                    <option value="casual">Casual Relaxed</option>
                    <option value="walking">Walking</option>
                    <option value="sitting">Sitting</option>
                    <option value="hands_in_pockets">Hands in Pockets</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Style Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings2 className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-slate-900">Style Settings</h2>
              </div>
              
              <div className="space-y-4">
                {/* Background */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Background
                  </label>
                  <select
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="studio_white">Studio White</option>
                    <option value="studio_grey">Studio Grey</option>
                    <option value="outdoor">Outdoor Natural</option>
                    <option value="urban">Urban Street</option>
                    <option value="minimal">Minimal Abstract</option>
                  </select>
                </div>

                {/* Photography Style */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Photography Style
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="editorial">Editorial</option>
                    <option value="casual">Lifestyle/Casual</option>
                    <option value="luxury">Luxury Brand</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!garmentFile || loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Fashion Image</span>
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Generated Result</h2>
                {generatedImage && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download</span>
                  </button>
                )}
              </div>

              <div className="aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                {loading ? (
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Creating your fashion image...</p>
                      <p className="text-xs text-slate-500">This may take 30-60 seconds</p>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt="Generated fashion model" 
                    className="w-full h-full object-contain"
                  />
                ) : error ? (
                  <div className="text-center space-y-2 px-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-sm font-medium text-red-600">{error}</p>
                    <p className="text-xs text-slate-500">Please try again or check your settings</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2 px-8">
                    <ImageIcon className="w-16 h-16 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium text-slate-500">No image generated yet</p>
                    <p className="text-xs text-slate-400">Upload a garment and click generate</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl border border-primary-200 p-6">
              <h3 className="text-sm font-semibold text-primary-900 mb-3">💡 How it works</h3>
              <ul className="space-y-2 text-xs text-primary-800">
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Upload a clear photo of your garment on a simple background</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Select your preferred model type, pose, and style settings</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Our AI generates a professional fashion photograph in seconds</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Download and use for e-commerce, marketing, or prototyping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 border-t border-slate-200 pt-8">
          <p>Fashion AI Studio Demo • Powered by advanced AI models</p>
          <p className="mt-2 text-xs">For demonstration purposes • Not for commercial use without proper licensing</p>
        </footer>
      </main>
    </div>
  );
}
