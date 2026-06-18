import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useTheme } from "../context/ThemeContext";

function Layout({ children }) {
  const { darkMode } = useTheme();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
  style={{
    flex: 1,
    minHeight: "100vh",
    background: darkMode
      ? "#0f172a"
      : "#f5f7fb",
    color: darkMode
      ? "#ffffff"
      : "#1f2937",
    transition: "0.3s",
  }}
>
        {/* CONTENT WRAPPER */}
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}>
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Layout;