
import React, { useState } from 'react';

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
            <div className="bg-gradient-to-r from-neon-purple to-neon-magenta h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const Step1 = () => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold font-heading">Personal Details</h2>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</label>
            <input type="text" className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annual Income</label>
            <input type="text" className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md" />
        </div>
    </div>
);

const Step2 = () => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold font-heading">Family & Lifestyle</h2>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Family Values</label>
            <select className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                <option>Modern</option>
                <option>Traditional</option>
                <option>Liberal</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Do you smoke?</label>
            <div className="flex gap-4 mt-1">
                <label className="flex items-center"><input type="radio" name="smoke" className="mr-2 accent-neon-magenta"/> Yes</label>
                <label className="flex items-center"><input type="radio" name="smoke" className="mr-2 accent-neon-magenta"/> No</label>
            </div>
        </div>
    </div>
);

const Step3 = () => (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold font-heading">Marriage Goals</h2>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Describe your ideal partner in a few words.</label>
            <textarea rows={4} className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md"></textarea>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">When are you looking to get married?</label>
            <select className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                <option>Within a year</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option>Still figuring it out</option>
            </select>
        </div>
    </div>
);


export const MarriageRegistration: React.FC = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    
    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="flex-grow bg-gray-100 dark:bg-dark-bg p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl md:text-4xl font-bold font-heading text-center mb-2">Marriage Profile</h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Complete your profile to find a serious partner.</p>
                
                <ProgressBar currentStep={step} totalSteps={totalSteps} />

                <div className="min-h-[300px]">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                </div>

                <div className="mt-8 flex justify-between">
                    <button onClick={prevStep} disabled={step === 1} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold rounded-md hover:bg-gray-400 disabled:opacity-50">
                        Back
                    </button>
                    {step < totalSteps ? (
                         <button onClick={nextStep} className="px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-magenta text-white font-bold rounded-md hover:scale-105 transition-transform">
                            Next
                        </button>
                    ) : (
                        <button className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md hover:scale-105 transition-transform">
                            Finish Registration
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
