import { Outlet, Link } from "react-router-dom";

import Header from "./Header"; 
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout() {
return (
    <div className="layout-container">
      {/* 1. Header 컴포넌트 사용 */}
      <Header /> 
      
      <div className="main-wrapper" style={{ display: 'flex' }}> 
        {/* 2. Sidebar 컴포넌트 사용 */}
        <Sidebar />
        
        <main className="page-content">
          {/* 3. 필수 요소: 자식 페이지가 렌더링될 위치 */}
          <Outlet /> 
        </main>
      </div>
      
      {/* 4. Footer 컴포넌트 사용 */}
      <Footer />
    </div>
  );
}

export default Layout;