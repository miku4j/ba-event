import createFetchClient from "openapi-fetch";
import createReactClient from "openapi-react-query";
import type { paths } from "./api.d";

const fetchClient = createFetchClient<paths>({ baseUrl: "" });

export const api = createReactClient(fetchClient);
export { fetchClient };
