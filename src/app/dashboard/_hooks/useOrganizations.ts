import { useEffect, useState } from "react";

import { getOrganizations } from "@/services/organizations";

import type { Organization } from "@/types/organization";

export const useOrganizations = (page: number) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
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

    fetchOrganizations();
  }, [page]);

  return { organizations, loading, error };
};
