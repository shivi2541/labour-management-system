export const cardStyle = (darkMode) => ({
  background: darkMode ? "#111827" : "#ffffff",
  color: darkMode ? "#ffffff" : "#111827",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
});
import { cardStyle } from "../styles/theme";

<div style={cardStyle(darkMode)}></div>