import { useEffect, useState } from 'react';

import { getOrganizations, updateOrganization } from '@/services/organizations';

import type { Organization } from '@/types/organization';

export const useOrganizations = (page?: number) => {
	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [updatingOrgIds, setUpdatingOrgIds] = useState<number[]>([]);

	const fetchOrganizations = async (page: number) => {
		setLoading(true);
		setError(null);

		const { success, data, message } = await getOrganizations({
			page: String(page),
		});

		if (success) {
			setOrganizations(data || []);
		} else {
			setError(message);
		}

		setLoading(false);
	};

	const fetchAllOrganizations = async () => {
		const { success, data, message } = await getOrganizations({
			page: String(page),
		});

		if (success) {
			return data || [];
		} else {
			return message;
		}
	};

	const updateActiveStatusOrganization = async (
		organization: Organization,
		page: number,
	) => {
		setUpdatingOrgIds((prev) => {
			return [...prev, organization.id];
		});
		const { success } = await updateOrganization({ organization });

		if (success) fetchOrganizations(page);

		const arr = updatingOrgIds.filter(function (item) {
			return item !== organization.id;
		});

		setUpdatingOrgIds(arr);
	};

	useEffect(() => {
		fetchOrganizations(page || 0);
	}, [page]);

	return {
		organizations,
		loading,
		error,
		updatingOrgIds,
		updateActiveStatusOrganization,
		fetchAllOrganizations,
	};
};
