import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const OrgForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [country, setCountry] = useState("");
  const [appName, setAppName] = useState("");
  const [data, setData] = useState("");
  const [appId, setAppId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle submission for step 2
      console.log("Form submitted:", {
        fullName,
        companyName,
        jobFunction,
        country,
        appName,
      });
      try {
        let res = await api({
          url: "/auth/register",
          method: "POST",
          responseType: "json",
          data: {
            fullName,
            companyName,
            jobFunction,
            country,
            appName,
            appId,
          },
        });
        if (res?.code === 200) {
          setFullName("");
          setCompanyName("");
          setJobFunction("");
          setCountry("");
          setAppName("");
          navigate("/reviews-feed");
        }
        if (res?.data?.code === 400) {
          alert("Registration done previously");
          // navigate("/reg_success");
        }
      } catch (error) {
        if (error.response.status === 401) navigate("/");
      }
    }
  };

  const searchApp = async (appname) => {
    if (appname.length > 3) {
      try {
        let res = await api({
          url: "/search_app",
          method: "POST",
          responseType: "json",
          data: {
            appname,
            country: country,
          },
        });
        if (res?.code === 200) {
          setData(res.data);
        }
      } catch (error) {
        if (error.response.status === 401) navigate("/");
      }
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
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select your country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="CN">Canada</option>
              {/* Add more country options here */}
            </select>
            {/* {console.log(appName, "----------appname")} */}
            <label htmlFor="appName">Search for your app:</label>

            <input
              type="text"
              id="appName"
              placeholder="Search for your app"
              value={appName}
              onChange={(e) => {
                setAppName(e.target.value);
                searchApp(e.target.value);
              }}
              required
            />
            {data &&
              data.map((item) => (
                <div className="search-inner">
                  <img
                    className="icon"
                    src={item.icon}
                    alt="icon"
                    onClick={() => {
                      setAppName(item.title);
                      setAppId(item.appId);
                    }}
                  />
                </div>
              ))}
            <button type="submit">submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default OrgForm;
