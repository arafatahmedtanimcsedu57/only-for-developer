/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

import { getOrganizations } from '@/services/organizations';

import type { Organization } from '@/types/organization';

export default function DashboardPage() {
	const router = useRouter();
	const [page, setPage] = useState<number>(0);

	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [loadingOrganizations, setLoadingOrganizations] =
		useState<boolean>(true);
	const [organizationsError, setOrganizationsError] = useState<string | null>(
		null,
	);

	const [logos, setLogos] = useState<{ [key: number]: string }>({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProviders, setSelectedProviders] = useState<
		Organization['locations'][0]['providers']
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoadingOrganizations(true);
			setOrganizationsError(null);

			const { success, data, message } = await getOrganizations({
				page: String(page),
			});

			if (success) {
				setOrganizations(data || []);
			} else setOrganizationsError(message);

			setLoadingOrganizations(false);
		};

		fetchData();
	}, [page]);

	useEffect(() => {
		const fetchLogos = async () => {
			const newLogos: { [key: number]: string } = {};
			await Promise.all(
				organizations.map(async (org) => {
					if (org.multimediaFile) {
						try {
							const response = await fetch(
								`https://stg-clinical-intake.allevia.md/api/v1/multimedia/preview-by-id/${org.multimediaFile.id}`,
							);
							const result = await response.json();
							if (result.success) {
								newLogos[org.id] = result.data; // The image URL from API response
							}
						} catch (error) {
							console.error(`Error fetching logo for org ${org.id}:`, error);
						}
					}
				}),
			);
			setLogos(newLogos);
		};

		if (organizations.length) fetchLogos();
	}, [organizations]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		router.push('/');
	};

	const openModalWithProviders = (
		providers: Organization['locations'][0]['providers'],
	) => {
		setSelectedProviders(providers);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProviders([]);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<header className="text-white p-4 flex justify-between items-center">
				<h1 className="text-xl font-bold">Dashboard</h1>
				<Button onClick={handleLogout}>Logout</Button>
			</header>
			<main className="flex-grow p-6">
				{loadingOrganizations ? (
					<p>Loading...</p>
				) : (
					<>
						<p className="text-xs text-red-500 mb-2">{organizationsError}</p>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Organization</TableHead>
									<TableHead>Active</TableHead>
									<TableHead>Locations</TableHead>
									<TableHead>Admins</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{organizations.map((org) => (
									<TableRow key={org.id}>
										<TableCell>
											<div className="flex flex-col gap-2">
												{logos[org.id] ? (
													<div className="p-4 border rounded-lg w-fit">
														<img
															src={logos[org.id]}
															alt="Organization Logo"
															loading="lazy"
															width={'100px'}
															style={{ aspectRatio: 'auto' }}
														/>
													</div>
												) : (
													<p></p>
												)}
												<p className="text-xs font-semibold">{org.name}</p>
											</div>
										</TableCell>
										<TableCell>{org.active ? 'Yes' : 'No'}</TableCell>
										<TableCell>
											{org.locations.map((loc) => (
												<p key={loc.id}>
													<span
														className="cursor-pointer text-blue-500"
														onClick={() =>
															openModalWithProviders(loc.providers)
														}
													>
														{loc.name}
													</span>
												</p>
											))}
										</TableCell>
										<TableCell>
											{org.organizationAdmins.map((admin) => (
												<p key={admin.id}>{admin.email}</p>
											))}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{/* Pagination Controls */}
						<div className="flex justify-between mt-4">
							<Button
								disabled={page === 0}
								onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
							>
								Previous
							</Button>
							<span>Page {page + 1}</span>
							<Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
						</div>
					</>
				)}
			</main>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				providers={selectedProviders}
			/>
		</div>
	);
}
