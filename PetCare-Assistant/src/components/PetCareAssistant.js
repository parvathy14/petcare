import React, { useState } from 'react';
import getRecommendations from './GeminiPrompt';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const RecommendationsDisplay = ({ recommendations }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="bg-indigo-600 px-4 py-2">
          <h3 className="text-lg font-semibold text-white">Recommendations</h3>
        </div>
        <div className="p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{recommendations}</pre>
        </div>
      </motion.div>
    </div>
  );
};

const PetCareAssistant = () => {
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [health, setHealth] = useState('');
  const [activity, setActivity] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const speciesOptions = ['Dog', 'Cat'];
  const breedOptions = {
    Dog: ['Labrador', 'Poodle', 'Bulldog'],
    Cat: ['Siamese', 'Persian', 'Maine Coon'],
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
    setBreed('');
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  const handleGetRecommendations = async () => {
    const prompt = `a ${age}-year-old ${breed} ${species} with ${health} health condition and ${activity} activity level.`;

    setLoading(true);
    setRecommendations(null);

    try {
      const data = await getRecommendations(prompt);
      setRecommendations(data);
    } catch (error) {
      console.error('Error:', error);
      setRecommendations('An error occurred while fetching recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Pet Care Assistant</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Species</label>
              <select
                value={species}
                onChange={handleSpeciesChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select an animal</option>
                {speciesOptions.map((specie) => (
                  <option key={specie} value={specie}>{specie}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Breed</label>
              <select
                value={breed}
                onChange={handleBreedChange}
                disabled={!species}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a breed</option>
                {species && breedOptions[species].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Health Condition</label>
              <select
                value={health}
                onChange={(e) => setHealth(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select health condition</option>
                <option value="good">Good</option>
                <option value="better">Better</option>
                <option value="normal">Normal</option>
                <option value="worse">Worse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select activity level</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>

            <button
              onClick={handleGetRecommendations}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Get Recommendations'
              )}
            </button>
          </div>
        </div>

        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Recommendations:</h2>
            <RecommendationsDisplay recommendations={recommendations} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PetCareAssistant;