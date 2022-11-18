import {NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse) => httpProxyMiddleware(req, res, {
     // You can use the `http-proxy` option
     target:'http://127.0.0.1:8000',
     // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
     pathRewrite: {
     '/assets':'http://127.0.0.1:8000/assets/',
     },
});