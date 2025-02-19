import { Provider } from "react-redux";
import { AppRouter } from "./router";
import { ThemeProvider } from "@/components/theme-provider";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
