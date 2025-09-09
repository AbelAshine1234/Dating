
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileMode } from '../types';
import Button from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const isMarriageMode = mode === ProfileMode.Marriage;
  
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration successful! (Simulation)");
    navigate('/login');
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" required className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input type="password" required className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Profile for</label>
              <select className="mt-1 w-full p-2 border rounded-md"><option>Self</option><option>Son</option><option>Daughter</option></select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Personal Details</h3>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input type="date" required className="mt-1 w-full p-2 border rounded-md" />
            </div>
             {isMarriageMode ? (
                <>
                <div>
                  <label className="block text-sm font-medium">Religion</label>
                  <select className="mt-1 w-full p-2 border rounded-md"><option>Hindu</option><option>Muslim</option></select>
                </div>
                 <div>
                  <label className="block text-sm font-medium">Community/Caste</label>
                  <input type="text" className="mt-1 w-full p-2 border rounded-md" />
                </div>
                </>
             ) : (
                <>
                <div>
                  <label className="block text-sm font-medium">Relationship Type</label>
                  <select className="mt-1 w-full p-2 border rounded-md"><option>Casual</option><option>Serious</option></select>
                </div>
                </>
             )}
          </div>
        );
      case 3:
          return (
             <div className="space-y-4">
               <h3 className="text-xl font-semibold text-gray-800">{isMarriageMode ? "Professional Details" : "Tell us about you"}</h3>
               <div>
                  <label className="block text-sm font-medium">Education</label>
                  <input type="text" className="mt-1 w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Occupation</label>
                  <input type="text" className="mt-1 w-full p-2 border rounded-md" />
                </div>
                {isMarriageMode ? (
                    <div>
                        <label className="block text-sm font-medium">Annual Income</label>
                        <input type="text" className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 10 Lakhs"/>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium">Your Bio</label>
                        <textarea className="mt-1 w-full p-2 border rounded-md" rows={3}></textarea>
                    </div>
                )}
             </div>
          );
      case 4:
          return (
            <div className="space-y-4">
               <h3 className="text-xl font-semibold text-gray-800">Verification</h3>
                <div>
                    <label className="block text-sm font-medium">Upload your photo</label>
                    <input type="file" className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[#e42525] hover:file:bg-red-100"/>
                </div>
                <div className="flex items-start">
                    <input id="terms" type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded mt-1"/>
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the <a href="#" className="text-[#007bff] hover:underline">Terms and Conditions</a>.</label>
                </div>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
            Create Your {isMarriageMode ? 'Matrimonial' : 'Dating'} Profile
        </h2>
        <p className="text-center text-gray-600 mb-6">It's free and always will be.</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div className="bg-[#e42525] h-2.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="min-h-[300px]">
                {renderStep()}
            </div>
             <div className="flex justify-between mt-8">
                {step > 1 ? (
                    <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>
                ) : <div/>}
                {step < totalSteps ? (
                    <Button type="button" onClick={nextStep}>Next</Button>
                ) : (
                    <Button type="submit">Register Free</Button>
                )}
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
