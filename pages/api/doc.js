import { withSwagger } from "next-swagger-doc";
const swaggerHandler = withSwagger({
  openApiVersion: "3.0.0",
  title: "MOVIE API DOCUMENTATION",
  version: "1.0.0",
  apiFolder: "pages/api",
  info: {
    description: "hello",
  },
});
export default swaggerHandler();
