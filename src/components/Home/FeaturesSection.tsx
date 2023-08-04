// FeaturesSection.tsx
import express from '../../assets/expresslogo.png';
import firebase from '../../assets/firebase.png';
import json from '../../assets/json1.webp';
import React from 'react';
import './Home.css'

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: express, 
      title: 'Note Categorization',
      description: 'Organize your notes into categories for better management and easy retrieval.',
    },
    {
      icon: firebase, 
      title: 'Cloud Storage',
      description: 'Store your notes securely in the cloud for easy access across devices.',
    },
    {
      icon: json, 
      title: 'Authorization',
      description: 'Store your notes securely in the cloud for easy access across devices.',
    },
    
  ];

  return (
    <section className="features-section px-5 bg-color py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-white p-4 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <img src={feature.icon} alt={feature.title} className="w-40 h-20 rounded-full" />
              </div>
              <div>
                <h3 className="text-xl text-black font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
