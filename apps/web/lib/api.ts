import type {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const api = axios.create({
	baseURL: "/api",
	timeout: 15_000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

// Request interceptor
api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Add authorization headers here if needed.
		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.response) {
			// Server responded with a non-2xx status.
			console.error("API error:", error.response.status);
		} else if (error.request) {
			// Request was sent but no response was received.
			console.error("Network error: no response received");
		} else {
			console.error("Request setup error:", error.message);
		}

		return Promise.reject(error);
	},
);

export default api;
