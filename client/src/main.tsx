import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { client } from "./lib/applo.ts";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
