import React from "react";
import { UserListingPage } from "./pages/admin/UserListingPage";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">
            Élan Weddings Platform
          </h1>
        </div>
      </header>
      <main>
        <UserListingPage />
      </main>
    </div>
  );
};

export default App;

