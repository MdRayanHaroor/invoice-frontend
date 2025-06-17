import { useState } from "react"
import { Navigation } from "./components/Navigation"
import UploadPage from "./pages/UploadPage"
import AllInvoicesPage from "./pages/AllInvoicesPage"
import SearchInvoicePage from "./pages/SearchInvoicePage"
import './index.css'; // or './globals.css' or whatever your Tailwind CSS file is


export default function App() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="pb-8">
        {{
          upload: <UploadPage />,
          all: <AllInvoicesPage />,
          search: <SearchInvoicePage />
        }[activeTab]}
      </main>
    </div>
  )
}
