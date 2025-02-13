import { useEffect, useState } from "react";
import { getMediaLink } from "@/services/multimedia";
import type { Organization } from "@/types/organization";

export const useOrganizationLogos = (organizations: Organization[]) => {
  const [logos, setLogos] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchLogos = async () => {
      const newLogos: { [key: number]: string } = {};
      await Promise.all(
        organizations.map(async (org) => {
          if (org.multimediaFile) {
            const { success, data } = await getMediaLink({
              id: org.multimediaFile.id,
            });

            if (success) {
              newLogos[org.id] = data || "";
            }
          }
        })
      );
      setLogos(newLogos);
    };

    if (organizations.length) {
      fetchLogos();
    }
  }, [organizations]);

  return logos;
};
