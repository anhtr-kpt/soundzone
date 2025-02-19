import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { ThemeProvider } from "@/components/theme-provider";
import store from "./store";
import AppInitializer from "./AppInitializer";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppInitializer>
          <AppRouter />
        </AppInitializer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
