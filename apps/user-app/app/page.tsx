import "./globals.css";
import Image from "next/image"; 

export default function HERO() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        {/* Left Section: Text */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Fast, safe, <br /> social payments
          </h1>
          <p className="text-lg text-gray-700">
            Pay, get paid, grow a business, and more. Join the tens of millions of people using Nimbo.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300">
            Get Nimbo
          </button>
        </div>

        {/* Right Section: Image */}
        <div className="relative">
          <Image
            src="/picnic.png" 
            alt="Happy users"
            width={500}  // Example width
            height={500} // Example height
            className="rounded-3xl shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md flex items-center space-x-2">
            <Image
              src="/profile.png" 
              alt="Profile"
              width={40} 
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-sm text-gray-800">
              <strong>You paid Trish A</strong> <br /> Picnic in the park 🧺
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
