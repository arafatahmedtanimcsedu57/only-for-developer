import { APIS_END_POINT } from "@/constant/APIS";
import type { MultimediaFile } from "@/types/file";

const { MULTI_MEDIA_PREVIEW } = APIS_END_POINT;

export const getMediaLink = async ({ id }: { id: number }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

  try {
    const response = await fetch(
      `${baseUrl}/${apiPath}/${apiVersion}/${MULTI_MEDIA_PREVIEW}/${id}`
    );

    const data = await response.json();
    if (data.success) return { success: true, data: data.data as string };
    else
      return {
        success: false,
        message: data.message || "Something Went Wrong",
      };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
    };
  }
};
