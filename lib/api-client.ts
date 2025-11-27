import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { envConfig } from '@/config';
import { parseMessage } from '@/utils';

type ApiResult<T> =
	| {
			data: T;
			error?: never;
	  }
	| {
			data?: never;
			error: {
				message: string;
				status: number;
				details?: Record<string, unknown>;
			};
	  };

export class ApiClient {
	static async request<T>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
		try {
			const isFormData = config.data instanceof FormData;

			const client = axios.create({
				baseURL: envConfig.appUrl,
				headers: {
					'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
				},
			});
			const response: AxiosResponse<T> = await client.request(config);
			return { data: response.data };
		} catch (err) {
			if (isAxiosError(err)) {
				return {
					error: {
						message: parseMessage(err.response?.data.error),
						details: err.response?.data.details,
						status: err.response?.status || 500,
					},
				};
			}
			console.log(err);
			return {
				error: {
					message: 'An unknown error occurred',
					status: 500,
				},
			};
		}
	}

	static async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResult<T>> {
		return this.request<T>({ method: 'GET', url, params });
	}

	static async post<T, D = unknown>(url: string, data?: D): Promise<ApiResult<T>> {
		return this.request<T>({ method: 'POST', url, data });
	}

	static async put<T, D = unknown>(url: string, data?: D): Promise<ApiResult<T>> {
		return this.request<T>({ method: 'PUT', url, data });
	}

	static async patch<T, D = unknown>(url: string, data?: D): Promise<ApiResult<T>> {
		return this.request<T>({ method: 'PATCH', url, data });
	}

	static async delete<T>(url: string, params?: Record<string, unknown>): Promise<ApiResult<T>> {
		return this.request<T>({ method: 'DELETE', url, params });
	}
}
