import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { ThemeProvider } from "@/components/theme-provider";
import store from "./store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
