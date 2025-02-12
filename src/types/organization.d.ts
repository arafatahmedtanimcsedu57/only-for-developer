import type { MultimediaFile } from './file';

export interface Organization {
	id: number;
	name: string;
	active: boolean;
	locations: {
		id: number;
		name: string;
		address: {
			id: number;
			detail: string;
			city: string;
			state: string;
			zip: string;
			creationDate: string;
			modificationDate: string;
		};
		activeStatus: boolean;
		timeZone: string;
		providers: {
			id: number;
			name: string;
			email: string;
			phone: string;
			ehrProviderId: string;
			logo: {
				id: number;
				size: number;
				unit: string;
				creationDate: string;
				modificationDate: string;
			};
			specialization: {
				id: null;
				name: string | null;
				creationDate: string;
				modificationDate: string;
			};
			activeStatus: boolean;
			enableEmailPdf: boolean;
			creationDate: string;
			modificationDate: string;
		}[];
	}[];
	organizationAdmins: {
		id: number;
		email: string;
	}[];

	clinicalStaffs: {
		id: number;
		email: string;
	}[];
	multimediaFile?: MultimediaFile;
	creationDate: string;
	modificationDate: string;
}
