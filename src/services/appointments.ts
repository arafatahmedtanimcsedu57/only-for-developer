import { APIS_END_POINT } from "@/constant/APIS";
import type { AppointmentResponse } from "@/types/appointment";

const { APPOINTMENTS } = APIS_END_POINT;
const token = localStorage.getItem("token");

export const getAppointments = async ({
  page,
  startDate,
  endDate,
}: {
  page: string;
  startDate: string;
  endDate: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

  try {
    const response = await fetch(
      `${baseUrl}/${apiPath}/${apiVersion}/${APPOINTMENTS}?page=${page}&size=5&startDate=${startDate}&endDate=${endDate}&appointmentId=`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.success)
      return { success: true, data: data.data as AppointmentResponse };
    else
      return {
        success: false,
        message: data.message || "Something Went Wrong",
        logout: response.status === 401,
      };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
      logout: false,
    };
  }
};
