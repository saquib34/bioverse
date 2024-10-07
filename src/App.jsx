// import { useEffect } from "react";
// import {
//   Routes,
//   Route,
//   useNavigationType,
//   useLocation,
// } from "react-router-dom";
// import Frame from "./pages/Frame";
// import RegistrationForm from './components/registration/RegistrationForm';
// import Login from './components/Login';
// import AdditionalDetails from './components/AdditionalDetails';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Signup from './components/Signup';
// import ContactUsPage from './components/ContactUsPage';
// import SubmissionPage from './components/SubmissionPage';
// import EditPage from "./components/EditPage";
// import EmailVerificationPage from "./components/EmailVerificationPage";
// import EasebuzzPayment from "./components/payment/payment";
// import SuccessPage from "./components/payment/SuccessPage";
// import FailurePage from "./components/payment/FailurePage";
// import EventSelection from "./components/EventSelection";
// import PaperPresentationRegistration from "./components/PaperPresentationRegistration";
// import BioverseLaunch from "./components/BioverseLaunch";
// import DownloadLink from "./components/DownloadLink"

// function App() {
//   const action = useNavigationType();
//   const location = useLocation();
//   const pathname = location.pathname;

//   useEffect(() => {
//     if (action !== "POP") {
//       window.scrollTo(0, 0);
//     }
//   }, [action, pathname]);

//   useEffect(() => {
//     let title = "";
//     let metaDescription = "";

//     switch (pathname) {
//       case "/":
//         title = "";
//         metaDescription = "";
//         break;
//     }

//     if (title) {
//       document.title = title;
//     }

//     if (metaDescription) {
//       const metaDescriptionTag = document.querySelector(
//         'head > meta[name="description"]'
//       );
//       if (metaDescriptionTag) {
//         metaDescriptionTag.content = metaDescription;
//       }
//     }
//   }, [pathname]);

//   return (
//     <Routes>
//       <Route path="/" element={<Frame />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/registration" element={<RegistrationForm />} />
//       <Route path="/event-selection" element={<EventSelection />} />
//       <Route path="/paper-presentation-registration" element={<PaperPresentationRegistration />} />
//       <Route path="/bioverse-launch" element={<BioverseLaunch />} />
//       <Route path="/sponsors" element={<DownloadLink/>} />
//       <Route path="/additional-details" element={
//         <ProtectedRoute>
//           <AdditionalDetails />
//         </ProtectedRoute>
//       } />
//       <Route path="/dashboard" element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       } />
//       <Route path="/submissions" element={
//         <ProtectedRoute>
//           <SubmissionPage />
//         </ProtectedRoute>
//       } />
//       <Route path="/edit" element={
//         <ProtectedRoute>
//           <EditPage />
//         </ProtectedRoute>
//       } />
//       <Route path="/verify-email" element={<EmailVerificationPage />} />
//       <Route path="/contactus" element={<ContactUsPage />} />
//       <Route path="/payment" element={<EasebuzzPayment />} />
//       <Route path="/payment/success" element={<SuccessPage />} />
//       <Route path="/payment/failure" element={<FailurePage />} />
//     </Routes>
//   );
// }

// export default App;

// just show the Yet to launch
import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mt-10">Bioverse Launch</h1>
      <p className="text-lg mt-5">Coming Soon...</p>
 
    </div>

  );

};

export default App;