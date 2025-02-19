import { Organization } from "./organization";

export type AppointmentStatus =
  | "IN_PROGRESS"
  | "NOT_VISITED"
  | "COMPLETED"
  | "VISITED";

export interface PatientName {
  first: string;
  last: string;
}

export interface Appointment {
  patientId: string;
  appointmentDate: string;
  name: PatientName;
  phoneNumber: string | null;
  providerName: string;
  cliFromStatus: AppointmentStatus;
  digiRegFormStatus: AppointmentStatus;
  digiRegFormResponseId: string | null;
  cliFormFormResponseId: string;
  cliAppointmentLink: string;
  digiregAppointmentLink: string | null;

  organization: Organization
}

export interface AppointmentResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Appointment[];
}
