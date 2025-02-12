import { APIS_END_POINT } from '@/constant/APIS';

const { AUTH } = APIS_END_POINT;
export const loginUser = async ({
	login,
	password,
}: {
	login: string;
	password: string;
}) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiPath = process.env.NEXT_PUBLIC_API_PATH;
	const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

	try {
		const response = await fetch(
			`${baseUrl}/${apiPath}/${apiVersion}/${AUTH}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login, password }),
			},
		);

		const data = await response.json();
		if (data.success) {
			return { success: true, token: data.data.token };
		} else {
			return { success: false, message: data.message || 'Login failed' };
		}
	} catch (error: unknown) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'An error occurred. Please try again.',
		};
	}
};
