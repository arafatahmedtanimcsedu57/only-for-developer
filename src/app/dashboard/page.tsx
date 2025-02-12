/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Modal } from '@/components/ui/modal';

import { getOrganizations } from '@/services/organizations';

import type { Organization } from '@/types/organization';
import {
	CheckIcon,
	CrossIcon,
	MapPinCheckIcon,
	ShieldIcon,
} from 'lucide-react';
import Header from './_components/Header';

export default function DashboardPage() {
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
			<Header />
			<main className="flex-grow p-6">
				<div className="p-6 border rounded-xl flex flex-col gap-6 bg-slate-100">
					<div>
						<h2 className="text-lg text-slate-900">Organizations</h2>
						<p className="text-xs text-slate-600">
							List of organizations with admins information
						</p>
					</div>
					<div className="border rounded-lg bg-white">
						{loadingOrganizations ? (
							<p>Loading...</p>
						) : (
							<>
								<p className="text-xs text-red-500 mb-2">
									{organizationsError}
								</p>

								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="ps-6">ORGANIZATION</TableHead>
											<TableHead>ACTIVE</TableHead>
											<TableHead>LOCATIONS</TableHead>
											<TableHead className="pe-6">ADMINS</TableHead>
										</TableRow>
									</TableHeader>

									<TableBody>
										{organizations.map((org) => (
											<TableRow key={org.id}>
												<TableCell className="ps-6">
													<div className="flex flex-row items-center gap-2">
														{logos[org.id] ? (
															<div className="w-[40px] h-[40px] border rounded-full overflow-hidden flex items-center justify-center">
																<img
																	src={logos[org.id]}
																	alt="Organization Logo"
																	loading="lazy"
																	className=" object-fill"
																/>
															</div>
														) : (
															<p></p>
														)}
														<p className="text-xs font-semibold text-blue-600">
															{org.name}
														</p>
													</div>
												</TableCell>

												<TableCell>
													{org.active ? (
														<CheckIcon size={16} className="text-green-600" />
													) : (
														<CrossIcon size={16} />
													)}
												</TableCell>

												<TableCell>
													<div className="flex flex-col gap-3">
														{org.locations.map((loc) => (
															<p key={loc.id}>
																<span
																	className="cursor-pointer text-xs text-slate-700"
																	onClick={() =>
																		openModalWithProviders(loc.providers)
																	}
																>
																	<div className="flex gap-2 items-center text-slate-500 text-xs">
																		<MapPinCheckIcon
																			size={24}
																			className="text-purple-600"
																		/>
																		<div>
																			<p className="text-sm text-slate-800">
																				{loc.name}
																			</p>
																			<p>{loc.address.detail || '...'}</p>
																			<p>
																				{loc.address.city || '...'},{' '}
																				{loc.address.state || '...'},{' '}
																				{loc.address.zip || '...'}
																			</p>
																		</div>
																	</div>
																</span>
															</p>
														))}
													</div>
												</TableCell>

												<TableCell className="pe-6">
													<div className="flex flex-col gap-3 ">
														{org.organizationAdmins.map((admin) => (
															<div
																key={admin.id}
																className="flex gap-2 items-center text-slate-900 text-xs"
															>
																<ShieldIcon
																	size={16}
																	className="text-orange-600"
																/>
																<p>{admin.email}</p>
															</div>
														))}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>

								{/* Pagination Controls */}
							</>
						)}
					</div>

					<Pagination className="flex justify-end">
						<PaginationContent>
							<PaginationItem className="cursor-pointer">
								<PaginationPrevious
									onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
								/>
							</PaginationItem>

							<PaginationItem>
								<PaginationLink href="#" isActive>
									{page + 1}
								</PaginationLink>
							</PaginationItem>

							<PaginationItem className="cursor-pointer">
								<PaginationNext onClick={() => setPage((prev) => prev + 1)} />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
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
