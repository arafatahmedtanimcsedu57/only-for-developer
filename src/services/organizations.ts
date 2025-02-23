import { APIS_END_POINT } from '@/constant/APIS';
import type { Organization } from '@/types/organization';

const { ORGANIZATION } = APIS_END_POINT;
export const getOrganizations = async ({ page }: { page: string }) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiPath = process.env.NEXT_PUBLIC_API_PATH;
	const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

	try {
		const response = await fetch(
			`${baseUrl}/${apiPath}/${apiVersion}/${ORGANIZATION}?page=${page}&size=5`,
		);

		const data = await response.json();
		if (data.success)
			return { success: true, data: data.data as Organization[] };
		else
			return {
				success: false,
				message: data.message || 'Something Went Wrong',
			};
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

export const getAllOrganizations = async () => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiPath = process.env.NEXT_PUBLIC_API_PATH;
	const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

	try {
		const response = await fetch(
			`${baseUrl}/${apiPath}/${apiVersion}/${ORGANIZATION}?page=0&size=10000`,
		);

		const data = await response.json();
		if (data.success)
			return { success: true, data: data.data as Organization[] };
		else
			return {
				success: false,
				message: data.message || 'Something Went Wrong',
			};
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

export const updateOrganization = async ({
	organization,
}: {
	organization: Organization;
}) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiPath = process.env.NEXT_PUBLIC_API_PATH;
	const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

	try {
		const response = await fetch(
			`${baseUrl}/${apiPath}/${apiVersion}/${ORGANIZATION}/${organization.id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...organization }),
			},
		);

		const data = await response.json();
		if (data.success)
			return { success: true, data: data.data as Organization[] };
		else
			return {
				success: false,
				message: data.message || 'Something Went Wrong',
			};
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
