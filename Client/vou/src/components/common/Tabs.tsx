import React from 'react';

type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tab1Content: React.ReactNode;
  tab2Content: React.ReactNode;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tab1Content, tab2Content }) => {
  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('pending')}
          className={`p-2 rounded-md ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pending Requests
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`p-2 rounded-md ${activeTab === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sent Requests
        </button>
      </div>
      <div>
        {activeTab === 'pending' ? tab1Content : tab2Content}
      </div>
    </div>
  );
};

export default Tabs;
