
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Wallet,
  Coins,
  ArrowDown,
  X,
  Send,
  Upload,
  Fingerprint,
  Users,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

// Main application component with a professional UI
export default function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulating a user profile with a specific role and Decentralized Identity (DID)
  const [userProfile, setUserProfile] = useState({
    id: 'user-001-exporter',
    role: 'Exporter',
    company: 'Innovate Exports Ltd.',
    did: 'did:ethr:0x123456789abcdef...',
  });

  // Function to show a modal with a message
  const showModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // The main layout of the application
  return (
    <div className="flex flex-col text-gray-800 font-inter bg-slate-50 min-h-screen">
      {/* Top Header Section with Title and Account/Role Dropdown */}
      <header className="bg-white py-8 shadow-md sticky top-0 z-10">
        <div className="container mx-auto relative flex flex-col items-center">
          {/* Logo and Title - Centered */}
          <div className="flex items-center space-x-4 py-2">
            <Wallet className="w-12 h-12 text-blue-600" />
            <div className="flex flex-col">
              <span className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">TradeFineX</span>
              <span className="text-md lg:text-lg text-gray-600 leading-tight mt-1">Timeless Trade. Borderless Trust.</span>
            </div>
          </div>

          {/* Account & Role Dropdown positioned to the very top right */}
          <div className="absolute top-4 right-4">
            <AuthAndRoleDropdown
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              showModal={showModal}
            />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white p-4 shadow-sm sticky top-28 z-10">
        <div className="container mx-auto flex justify-center items-center space-x-4">
          <NavItem icon={<LayoutDashboard />} title="Dashboard" page="Dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<FileText />} title="LC Management" page="LC Management" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<ShoppingBag />} title="Marketplace" page="Marketplace" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<CreditCard />} title="Payments" page="Payments" currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 container mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{currentPage}</h1>
          {currentPage === 'Dashboard' && <Dashboard userRole={userProfile.role} showModal={showModal} userDid={userProfile.did} />}
          {currentPage === 'LC Management' && <LCManagement userRole={userProfile.role} showModal={showModal} />}
          {currentPage === 'Payments' && <Payments showModal={showModal} />}
          {currentPage === 'Marketplace' && <Marketplace showModal={showModal} />}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
}

// AuthAndRoleDropdown component for the combined Auth and Role Dropdown
const AuthAndRoleDropdown = ({ isLoggedIn, setIsLoggedIn, userProfile, setUserProfile, showModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('sign-in'); // 'sign-in' or 'sign-up'

  const handleAuthAction = (action) => {
    setAuthType(action);
    setIsAuthModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    showModal('Signed Out', 'You have successfully signed out.');
  };

  const handleRoleChange = (role) => {
    let company, did;
    if (role === 'Exporter') {
      company = 'Innovate Exports Ltd.';
      did = 'did:ethr:0x123456789abcdef...';
    } else if (role === 'Importer') {
      company = 'Global Trade Inc.';
      did = 'did:ethr:0xdeadbeef12345...';
    } else if (role === 'Bank') {
      company = 'First Blockchain Bank';
      did = 'did:ethr:0xfeedb0b1e55c0a...';
    }
    setUserProfile({ ...userProfile, role, company, did });
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative z-20">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <Users size={16} />
        <span>Account & Role</span>
        <ArrowDown size={12} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2">
          {/* User Auth Section */}
          <div className="px-4 py-2 text-gray-500 text-xs uppercase font-bold border-b border-gray-100">Authentication</div>
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => handleAuthAction('sign-in')}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Fingerprint size={16} />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => handleAuthAction('sign-up')}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Zap size={16} />
                <span>Sign Up</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
            >
              <X size={16} />
              <span>Sign Out</span>
            </button>
          )}

          {/* Role Selection Section */}
          <div className="px-4 py-2 mt-2 text-gray-500 text-xs uppercase font-bold border-b border-gray-100">Select Role</div>
          {['Exporter', 'Importer', 'Bank'].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-between transition-colors"
            >
              <span>{role}</span>
              {userProfile.role === role && <Check size={16} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authType={authType}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
};

// AuthModal component for sign-in/sign-up
const AuthModal = ({ isOpen, onClose, authType, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Please fill in both fields.');
      setLoading(false);
      return;
    }

    // Simulate an API call for authentication
    setTimeout(() => {
      setLoading(false);
      if (email === 'test@example.com' && password === 'password123') {
        setMessage(`Success! You have been ${authType === 'sign-in' ? 'signed in' : 'registered'}.`);
        onSuccess();
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={authType === 'sign-in' ? 'Sign In' : 'Sign Up'}>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>
        {message && <div className={`text-sm ${message.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Processing...' : authType === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </Modal>
  );
};

// NavItem component for the new horizontal navigation
const NavItem = ({ icon, title, page, currentPage, setCurrentPage }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all duration-200 group relative ${
      currentPage === page ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{title}</span>
    {/* Underline effect for active page */}
    {currentPage === page && <span className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-full transform scale-x-100 transition-transform duration-300"></span>}
  </button>
);

// Modal component for alerts and messages
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="text-gray-700">{children}</div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// LC Detail Modal
const LCDetailModal = ({ lc, onClose, showModal }) => {
  const transactionTimeline = [
    { event: 'LC Issued', date: '2024-07-15', status: 'Completed', detail: 'Letter of credit submitted by Importer.' },
    { event: 'LC Approved', date: '2024-07-16', status: 'Completed', detail: 'LC approved by the issuing bank.' },
    { event: 'Shipment of Goods', date: '2024-07-20', status: 'Completed', detail: 'Exporter has shipped the goods.' },
    { event: 'Documents Uploaded', date: '2024-07-21', status: 'Completed', detail: 'Exporter uploaded bill of lading and invoice.' },
    { event: 'Documents Verified (OCR/NLP)', date: '2024-07-21', status: 'Completed', detail: 'Smart contract verified documents for matching.' },
    { event: 'Final Payment', date: '2024-07-22', status: 'Completed', detail: 'Payment to be released to Exporter upon verification.' },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} title={`LC Detail: ${lc.id}`}>
      <div className="space-y-4 text-gray-700">
        <p><strong>Applicant:</strong> {lc.applicant}</p>
        <p><strong>Beneficiary:</strong> {lc.beneficiary}</p>
        <p><strong>Amount:</strong> {lc.amount}</p>
        <p><strong>Current Status:</strong>{' '}
          <span className={`font-semibold ${lc.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{lc.status}</span>
        </p>

        {/* Document Immutability Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Immutable Documents (IPFS)</h4>
          <div className="text-xs font-mono break-all text-blue-600">IPFS Hash: /ipfs/Qmd9p4d9s6n3h2f1k8g7j6e5c4a3b...</div>
          <p className="text-xs text-gray-500 mt-1">This hash ensures the document is tamper-proof and stored on a decentralized network.</p>
        </div>

        {/* Transaction Timeline */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Smart Contract Timeline</h4>
          <ol className="relative border-l border-gray-200 space-y-4 pl-4">
            {transactionTimeline.map((step, index) => (
              <li key={index} className="mb-2">
                <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border ${step.status === 'Completed' ? 'bg-green-500 border-white' : 'bg-yellow-500 border-white'}`}></div>
                <h5 className="font-medium">{step.event}</h5>
                <p className="text-sm text-gray-500">{step.detail}</p>
                {step.date && <time className="block text-xs text-gray-400 mt-1">{step.date}</time>}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4">
          <button
            onClick={() =>
              showModal(
                'Insurance Payout',
                'The smart contract for insurance has been triggered, and a payout of $5,000 has been sent to your wallet due to a simulated shipment delay.'
              )
            }
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShieldCheck size={20} />
            <span>Claim Insurance Payout</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Dashboard component to display key metrics and recent activity
const Dashboard = ({ userRole, showModal, userDid }) => {
  // Sample data for dashboard widgets
  const [data] = useState({
    activeLcs: 5,
    pendingPayments: 2,
    totalVolume: '1.2M',
    recentActivity: [
      { id: 1, type: 'LC Issued', description: 'LC #TRX1001 for ABC Corp', status: 'Pending Approval', parties: ['Importer', 'Bank'] },
      { id: 2, type: 'Payment Sent', description: 'Payment for LC #TRX998', status: 'Completed', parties: ['Exporter', 'Importer', 'Bank'] },
      { id: 3, type: 'LC Approved', description: 'LC #TRX999 for XYZ Inc', status: 'Active', parties: ['Exporter', 'Importer', 'Bank'] },
      { id: 4, type: 'Document Uploaded', description: 'Bill of Lading for LC #TRX999', status: 'Processing', parties: ['Exporter', 'Bank'] },
      { id: 5, type: 'Invoice Tokenized', description: 'Invoice #INV-2024-001 on Marketplace', status: 'Available', parties: ['Exporter', 'Bank'] },
    ],
  });

  const handleVerifyDid = () => {
    showModal(
      'DID Verification',
      <>
        <p className="mb-2">Your Decentralized Identity has been verified by the network.</p>
        <p>
          <strong>Verified DID:</strong>{' '}
          <span className="text-blue-600 font-mono text-sm break-all">{userDid}</span>
        </p>
        <p className="mt-2 text-gray-500 text-sm">This ensures your authenticity and permissioned access to the platform.</p>
      </>
    );
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Active LCs" value={data.activeLcs} icon={<FileText />} color="bg-blue-50" />
        <DashboardCard title="Pending Payments" value={data.pendingPayments} icon={<Coins />} color="bg-amber-50" />
        <DashboardCard title="Total Trade Volume" value={`${data.totalVolume}`} icon={<Send />} color="bg-emerald-50" />
      </section>

      {/* DID Verification Section */}
      <section className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Fingerprint className="text-blue-600" size={40} />
          <div>
            <h3 className="text-xl font-bold">Verify Your Identity</h3>
            <p className="text-gray-600">Ensure the authenticity of your digital identity on the network.</p>
          </div>
        </div>
        <button
          onClick={handleVerifyDid}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Verify DID
        </button>
      </section>

      {/* Real-time Visibility and Permissioned Access - Only show relevant activity */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Real-time Transaction Feed</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentActivity
                .filter((activity) => activity.parties.includes(userRole))
                .map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : activity.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : activity.status === 'Processing' || activity.status === 'Available'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Simulated analytics chart */}
      <section>
        <h2 className="text-2xl font-bold mb-4">LC Volume by Quarter</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="h-64 flex items-end space-x-4 p-4">
            <BarChartBar quarter="Q1 2024" value={350} max={600} color="bg-blue-500" />
            <BarChartBar quarter="Q2 2024" value={450} max={600} color="bg-blue-500" />
            <BarChartBar quarter="Q3 2024" value={580} max={600} color="bg-blue-500" />
            <BarChartBar quarter="Q4 2024" value={500} max={600} color="bg-blue-500" />
          </div>
        </div>
      </section>
    </div>
  );
};

// Dashboard Card component
const DashboardCard = ({ title, value, icon, color }) => (
  <div className={`p-6 rounded-2xl shadow-sm flex items-center justify-between ${color}`}>
    <div className="flex flex-col space-y-2">
      <span className="text-gray-500 font-medium">{title}</span>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
    </div>
    <div
      className={`p-3 rounded-full ${
        color === 'bg-blue-50' ? 'bg-blue-200 text-blue-600' : color === 'bg-amber-50' ? 'bg-amber-200 text-amber-600' : 'bg-emerald-200 text-emerald-600'
      }`}
    >
      {icon}
    </div>
  </div>
);

// Bar Chart Bar component for the dashboard
const BarChartBar = ({ quarter, value, max, color }) => (
  <div className="flex flex-col items-center justify-end w-1/4 h-full">
    <div className={`relative w-12 rounded-t-lg transition-all duration-500 ease-in-out ${color}`} style={{ height: `${(value / max) * 100}%` }}>
      <span className="absolute -top-6 text-sm font-semibold text-gray-700 w-full text-center">{value}K</span>
    </div>
    <span className="text-sm text-gray-500 mt-2">{quarter}</span>
  </div>
);

// LC Management component
const LCManagement = ({ userRole, showModal }) => {
  const [lcs, setLcs] = useState([
    { id: 'LC-1001', applicant: 'Global Trade Inc.', beneficiary: 'Shipping Solutions Co.', amount: '50,000 USD', status: 'Pending Approval', parties: ['Importer', 'Bank'] },
    { id: 'LC-1002', applicant: 'Innovate Exports Ltd.', beneficiary: 'Tech Imports Ltd.', amount: '120,000 EUR', status: 'Active', parties: ['Exporter', 'Importer', 'Bank'] },
    { id: 'LC-1003', applicant: 'Supply Chain Group', beneficiary: 'Logistics Pro', amount: '80,000 USD', status: 'Completed', parties: ['Exporter', 'Importer', 'Bank'] },
    { id: 'LC-1004', applicant: 'Innovate Exports Ltd.', beneficiary: 'Tech Imports Ltd.', amount: '150,000 USD', status: 'Processing', parties: ['Exporter', 'Importer', 'Bank'] },
  ]);

  const [newLc, setNewLc] = useState({ applicant: '', beneficiary: '', amount: '' });
  const [selectedLc, setSelectedLc] = useState(null);

  // Effect to handle "real-time" status updates and notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setLcs((currentLcs) =>
        currentLcs.map((lc) => {
          if (lc.status === 'Processing') {
            const nextStatus = Math.random() < 0.8 ? 'Active' : 'Failed'; // 80% chance of success
            return { ...lc, status: nextStatus };
          }
          return lc;
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLc({ ...newLc, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLc.applicant && newLc.beneficiary && newLc.amount) {
      const lcId = `LC-${Math.floor(Math.random() * 1000) + 1000}`;
      const newLcEntry = {
        id: lcId,
        applicant: newLc.applicant,
        beneficiary: newLc.beneficiary,
        amount: newLc.amount,
        status: 'Processing',
        parties: [userRole, 'Bank'],
      };
      setLcs([newLcEntry, ...lcs]);
      setNewLc({ applicant: '', beneficiary: '', amount: '' });
      showModal('LC Issuance', `New LC ${lcId} has been submitted to the smart contract for processing.`);
    } else {
      showModal('Form Error', 'Please fill out all fields.');
    }
  };

  // Simulating document digitization and immutability (OCR & IPFS)
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      showModal('Processing Document...', 'Running OCR and NLP to extract and match data...');
      setTimeout(() => {
        const ipfsHash = '/ipfs/Qmd9p4d9s6n3h2f1k8g7j6e5c4a3b...';
        showModal(
          'Document Verification & Storage',
          <>
            <p className="mb-2">Document "{file.name}" has been digitized and stored on IPFS.</p>
            <p className="mb-2">
              <strong>AI-Powered Matching Result:</strong> <span className="text-green-600 font-semibold">Match Found!</span>
            </p>
            <p>
              <strong>Immutable IPFS Hash:</strong>{' '}
              <span className="text-blue-600 font-mono text-sm break-all">{ipfsHash}</span>
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              The document was automatically matched to a trade contract, and its immutable record is secured on a decentralized repository.
            </p>
          </>
        );
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      {selectedLc && <LCDetailModal lc={selectedLc} onClose={() => setSelectedLc(null)} showModal={showModal} />}

      {/* Document Digitization & AI Matching Section */}
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Upload />
          <span>AI-Powered Document Verification</span>
        </h2>
        <p className="text-gray-600 mt-2 mb-4">
          Upload a document to digitize it and have a smart contract verify its data against trade records.
        </p>
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors">
            <input id="file-upload" type="file" className="hidden" onChange={handleDocumentUpload} />
            Click to upload a document (e.g., Invoice, Bill of Lading)
          </div>
        </label>
      </div>

      {/* Smart Contracts for Automation & Visibility - New LC Section */}
      <h2 className="text-2xl font-bold">Issue New Letter of Credit</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Applicant</label>
          <input
            type="text"
            name="applicant"
            value={newLc.applicant}
            onChange={handleInputChange}
            placeholder="e.g., Global Trade Inc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Beneficiary</label>
          <input
            type="text"
            name="beneficiary"
            value={newLc.beneficiary}
            onChange={handleInputChange}
            placeholder="e.g., Shipping Solutions Co."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Amount</label>
          <input
            type="text"
            name="amount"
            value={newLc.amount}
            onChange={handleInputChange}
            placeholder="e.g., 50,000 USD"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-end md:col-span-2">
          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Submit LC
          </button>
        </div>
      </form>

      {/* Real-time Visibility and Tracking - All LCs */}
      <h2 className="text-2xl font-bold mt-8">All Letters of Credit</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">LC ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Beneficiary</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lcs
              .filter((lc) => lc.parties.includes(userRole))
              .map((lc) => (
                <tr key={lc.id} onClick={() => setSelectedLc(lc)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lc.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lc.applicant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lc.beneficiary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lc.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lc.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : lc.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : lc.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {lc.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Marketplace Component for Tokenized Trade Finance Products
const Marketplace = ({ showModal }) => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', value: '80,000 USD', discount: '5%', tokenCount: 80, isTokenized: false },
    { id: 'INV-002', value: '120,000 USD', discount: '7%', tokenCount: 120, isTokenized: true },
    { id: 'INV-003', value: '45,000 EUR', discount: '6%', tokenCount: 45, isTokenized: true },
  ]);

  const handleTokenize = (id) => {
    showModal('Tokenizing Asset', 'Processing invoice on smart contract... creating ERC-20 tokens.');
    setTimeout(() => {
      setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, isTokenized: true } : inv)));
      const count = invoices.find((inv) => inv.id === id)?.tokenCount ?? 0;
      showModal('Tokenization Complete!', `Invoice ${id} has been tokenized into ${count} ERC-20 tokens. It is now available for fractional trading.`);
    }, 2000);
  };

  const handlePurchase = (id) => {
    showModal('Purchasing Tokens', `Sending transaction to buy tokens for invoice ${id}. This transaction would be settled on the blockchain.`);
    setTimeout(() => {
      showModal('Purchase Successful!', `You have successfully acquired tokens for invoice ${id}. You now own a fraction of this trade asset.`);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold flex items-center space-x-2">
        <ShoppingBag />
        <span>Trade Finance Marketplace</span>
      </h2>
      <p className="text-gray-600">Buy and sell tokenized trade assets to increase liquidity and access new investment opportunities.</p>

      {/* Invoice Tokenization Section */}
      <section className="p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">My Invoices</h3>
        <ul className="space-y-4">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
              <div>
                <h4 className="font-semibold">{invoice.id}</h4>
                <p className="text-gray-600 text-sm">Value: {invoice.value} | Discount: {invoice.discount}</p>
              </div>
              <div>
                {!invoice.isTokenized ? (
                  <button
                    onClick={() => handleTokenize(invoice.id)}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Tokenize
                  </button>
                ) : (
                  <span className="flex items-center space-x-2 text-green-600 font-semibold">
                    <Check size={20} />
                    <span>Tokenized</span>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Public Marketplace Section */}
      <section className="p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Available Trade Assets</h3>
        <p className="text-gray-600 mb-4">View and purchase fractional ownership of invoices listed by other participants.</p>
        <ul className="space-y-4">
          {[
            { id: 'INV-004', value: '95,000 USD', discount: '6.5%', tokensAvailable: 95 },
            { id: 'INV-005', value: '60,000 EUR', discount: '5.2%', tokensAvailable: 60 },
          ].map((asset) => (
            <li key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
              <div>
                <h4 className="font-semibold">{asset.id}</h4>
                <p className="text-gray-600 text-sm">Value: {asset.value} | Discount: {asset.discount}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 font-medium">{asset.tokensAvailable} Tokens</span>
                <button
                  onClick={() => handlePurchase(asset.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Purchase
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

// Payments component to simulate MetaMask payments
const Payments = ({ showModal }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulates a MetaMask payment process, which would be triggered by a smart contract
  const handleMetaMaskPayment = async () => {
    setIsProcessing(true);
    showModal('Processing Payment', 'Please confirm the transaction in your MetaMask wallet. This payment is being triggered by a smart contract condition.');
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      showModal('Payment Confirmed', 'Payment has been successfully processed via MetaMask! Funds were settled instantly, per the smart contract terms.');
    } catch (error) {
      showModal('Payment Failed', 'An error occurred during the transaction. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Instantaneous and Secure Payments */}
      <h2 className="text-2xl font-bold flex items-center space-x-2">
        <CreditCard />
        <span>Make a Payment</span>
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Instantaneous and Secure Payments</h3>
          <p className="text-gray-600">
            Payments are executed instantly via a smart contract once all conditions are met, eliminating delays and manual processes.
          </p>
        </div>
        <button
          onClick={handleMetaMaskPayment}
          disabled={isProcessing}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Pay with MetaMask'}
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Transaction History</h3>
        <p className="text-gray-500 mt-2">No past transactions found.</p>
      </div>
    </div>
  );
};
