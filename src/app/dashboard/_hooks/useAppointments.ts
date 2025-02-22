import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { getAppointments } from '@/services/appointments';

import type { Appointment } from '@/types/appointment';

export const useAppointments = (
	page: number,
	startDate: Date,
	endDate: Date,
	organizationId: string,
) => {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<{
		success: boolean;
		message: string;
		logout: boolean;
	} | null>(null);

	const fetchAppointments = async (
		page: number,
		startDate: Date,
		endDate: Date,
		organizationId: string,
	) => {
		setLoading(true);
		setError(null);

		const formattedStart = format(startDate, "yyyy-MM-dd'T'00:00:00.000'Z'");
		const formattedEnd = format(endDate, "yyyy-MM-dd'T'23:59:59.999'Z'");

		const { success, data, message, logout } = await getAppointments({
			page: String(page),
			startDate: formattedStart,
			endDate: formattedEnd,
			organizationId,
		});

		if (success) {
			setAppointments(data?.content || []);
		} else {
			setError({ success, message, logout: logout || false });
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchAppointments(page, startDate, endDate, organizationId);
	}, [page, startDate, endDate, organizationId]);

	return {
		appointments,
		loading,
		error,
	};
};
