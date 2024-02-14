import React, { useState } from 'react';


const OrgForm = () => {
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [jobFunction, setJobFunction] = useState('');
    const [country, setCountry] = useState('');
    const [appName, setAppName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (step === 1) {
        setStep(2);
      } else {
        // Handle submission for step 2
        console.log('Form submitted:', {
          fullName,
          companyName,
          jobFunction,
          country,
          appName,
        });
        // Reset form fields
        setFullName('');
        setCompanyName('');
        setJobFunction('');
        setCountry('');
        setAppName('');
        // Go back to step 1
        setStep(1);
      }
    };
  
    return (
      <div className="two-step-form-container">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <label htmlFor="jobFunction">Job Function (optional):</label>
              <input
                type="text"
                id="jobFunction"
                placeholder="Job Function"
                value={jobFunction}
                onChange={(e) => setJobFunction(e.target.value)}
              />
              <button type="submit">Save and Proceed</button>
            </>
          )}
  
          {step === 2 && (
            <>
              <label htmlFor="country">Select your country:</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                {/* Add more country options here */}
              </select>
              <label htmlFor="appName">Search for your app:</label>
              <input
                type="text"
                id="appName"
                placeholder="Search for your app"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
              />
              <button type="submit">Save and Proceed</button>
            </>
          )}
        </form> 
      </div>
    );
  };
  
  export default OrgForm;