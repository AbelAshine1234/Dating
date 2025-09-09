
import React from 'react';
import Button from '../components/ui/Button';
import { MdCheckCircle } from 'react-icons/md';

const PaymentPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Upgrade to Premium</h1>
          <p className="text-lg text-gray-600 mt-2">Unlock exclusive features and increase your chances of finding a match.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-2xl font-bold text-center text-gray-500">Free</h2>
            <p className="text-center text-gray-400 mt-2">Basic Access</p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center"><MdCheckCircle className="text-gray-400 mr-2" /> Create Profile</li>
              <li className="flex items-center"><MdCheckCircle className="text-gray-400 mr-2" /> Send Interests</li>
              <li className="flex items-center"><MdCheckCircle className="text-gray-400 mr-2" /> Basic Search</li>
            </ul>
          </div>

          {/* Gold Plan */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-[#e42525] transform scale-105">
            <h2 className="text-2xl font-bold text-center text-[#e42525]">Gold</h2>
            <p className="text-center text-4xl font-bold my-4">$9.99<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <Button className="w-full">Choose Gold</Button>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> All Free features</li>
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> Unlimited Chat</li>
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> View Contact Details</li>
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> Unblur Photos</li>
            </ul>
          </div>

          {/* Diamond Plan */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-2xl font-bold text-center text-blue-500">Diamond</h2>
            <p className="text-center text-4xl font-bold my-4">$19.99<span className="text-lg font-normal text-gray-500">/mo</span></p>
             <Button variant="secondary" className="w-full bg-blue-500 text-white hover:bg-blue-600">Choose Diamond</Button>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> All Gold features</li>
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> Profile Boost</li>
              <li className="flex items-center"><MdCheckCircle className="text-green-500 mr-2" /> Standout from the crowd</li>
            </ul>
          </div>
        </div>
        
        {/* Payment Form */}
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h3>
            <form className="space-y-4">
                <div>
                    <label className="block font-medium">Card Number</label>
                    <input type="text" placeholder="**** **** **** ****" className="w-full p-2 border rounded-md mt-1"/>
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block font-medium">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded-md mt-1"/>
                    </div>
                    <div className="w-1/2">
                         <label className="block font-medium">CVC</label>
                        <input type="text" placeholder="***" className="w-full p-2 border rounded-md mt-1"/>
                    </div>
                </div>
                 <Button className="w-full mt-4" onClick={() => alert('Payment Successful! (Simulation)')}>Pay Now</Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
