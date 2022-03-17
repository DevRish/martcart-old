import { createProxyMiddleware } from "http-proxy-middleware";
import { SERVER_URL } from "./config/keys.jsx"

function Proxy(app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: SERVER_URL ,
      changeOrigin: true,
    })
  );
}

export default Proxy;