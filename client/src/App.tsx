import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./router";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
