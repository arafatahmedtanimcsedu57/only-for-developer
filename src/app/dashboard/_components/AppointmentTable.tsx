'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import NotFound from './NotFound';
import TablePagination from './TablePagination';

import { useAppointments } from '../_hooks/useAppointments';
import { useOrganizations } from '../_hooks/useOrganizations';
import { Organization } from '@/types/organization';

export default function AppointmentTable() {
	const [page, setPage] = useState(0);
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 15)); // End date is 15 days ahead
	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [organizationId, setOrganizationId] = useState<string>('');

	const { fetchAllOrganizations } = useOrganizations();
	const { appointments, loading, error } = useAppointments(
		page,
		startDate,
		endDate,
		organizationId,
	);

	useEffect(() => {
		fetchAllOrganizations().then((res) => setOrganizations(res));
	}, []);

	if (error && error.logout) return;

	return (
		<div className="p-6 border rounded-xl flex flex-col gap-6 bg-slate-100">
			<div className="flex justify-between items-center">
				<div>
					<div>
						<h2 className="text-lg text-slate-900">Appointments</h2>
						<p className="text-xs text-slate-600">
							List of appointments of all organizations
						</p>
					</div>
					<div className="flex gap-4 mt-4">
						<div className="flex gap-4 items-center flex-wrap">
							<div className="flex gap-4 items-center">
								<div>From</div>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline">
											{format(startDate, 'yyyy-MM-dd')}
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<Calendar
											mode="single"
											selected={startDate}
											onSelect={setStartDate}
										/>
									</PopoverContent>
								</Popover>
							</div>
							<div>~</div>
							<div className="flex gap-4 items-center">
								<div>To</div>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline">
											{format(endDate, 'yyyy-MM-dd')}
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<Calendar
											mode="single"
											selected={endDate}
											onSelect={setEndDate}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>
				</div>

				<div>
					<Select onValueChange={(e) => setOrganizationId(e)}>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Select an Organization" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Organizations</SelectLabel>
								{organizations.map((org) => {
									return (
										<SelectItem key={org.id} value={String(org.id)}>
											{org.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="border rounded-lg bg-white p-6">
				{loading ? (
					<p>Loading...</p>
				) : (
					<>
						<p className="text-xs text-red-500 mb-2">{error?.message}</p>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead></TableHead>
									<TableHead>Patient Name</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>CLI</TableHead>
									<TableHead>DIGI</TableHead>
									<TableHead>Organization</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{appointments.length > 0 ? (
									appointments.map((appointment, index) => (
										<TableRow key={index}>
											<TableCell>#{index}</TableCell>
											<TableCell>
												{appointment.name?.first || '...'}{' '}
												{appointment.name?.last || '...'}
											</TableCell>
											<TableCell>{appointment.appointmentDate}</TableCell>
											<TableCell>
												<div>
													<p className="text-purple-600 font-semibold">
														{appointment.cliFromStatus}
													</p>
													{appointment.cliAppointmentLink ? (
														<a
															className="text-blue-600 text-xs"
															href={`${appointment.cliAppointmentLink}`}
														>
															CLI Form Link
														</a>
													) : (
														<>...</>
													)}
												</div>
											</TableCell>

											<TableCell>
												<div>
													<p className="text-pink-600 font-semibold">
														{appointment.digiRegFormStatus}
													</p>
													{appointment.digiregAppointmentLink ? (
														<a
															className="text-blue-600 text-xs"
															href={`${appointment.digiregAppointmentLink}`}
														>
															DIGI Form Link
														</a>
													) : (
														<>...</>
													)}
												</div>
											</TableCell>

											<TableCell>{appointment.organization.name}</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>
											<NotFound text={'No Appointment record found'} />
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</>
				)}
			</div>

			<TablePagination page={page} setPage={setPage} />
		</div>
	);
}
