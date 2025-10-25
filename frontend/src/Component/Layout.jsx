
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './SideBar'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  // Pages where sidebar should be hidden
  const hideSidebarPages = ['/login', '/signup']
  const shouldShowSidebar = !hideSidebarPages.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* Conditional Sidebar */}
        {shouldShowSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          shouldShowSidebar ? 'ml-0 lg:ml-64' : 'ml-0'
        }`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}