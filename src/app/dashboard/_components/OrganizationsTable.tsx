"use client";

import { useState } from "react";
import { CheckIcon, MapPinCheckIcon, ShieldIcon, XIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";
import ProviderModal from "./ProviderModal";
import NotFound from "./NotFound";

import { useOrganizations } from "./../_hooks/useOrganizations";
import { useOrganizationLogos } from "../_hooks/useOrganizationLogos";

import type { Organization } from "@/types/organization";

const OrganizationsTable = () => {
  const [page, setPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState<
    Organization["locations"][0]["providers"]
  >([]);

  const {
    organizations,
    loading,
    error,
    updatingOrgIds,
    updateActiveStatusOrganization,
  } = useOrganizations(page);
  const logos = useOrganizationLogos(organizations);

  const openModalWithProviders = (
    providers: Organization["locations"][0]["providers"]
  ) => {
    setSelectedProviders(providers);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProviders([]);
  };

  return (
    <>
      <div className="p-6 border rounded-xl flex flex-col gap-6 bg-slate-100">
        <div>
          <h2 className="text-lg text-slate-900">Organizations</h2>
          <p className="text-xs text-slate-600">
            List of organizations with admins information
          </p>
        </div>
        <div className="border rounded-lg bg-white p-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="text-xs text-red-500 mb-2">{error}</p>

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
                  {!!organizations.length ? (
                    organizations.map((org) => (
                      <TableRow key={org.id} aria-disabled>
                        <TableCell className="ps-6">
                          <div className="flex flex-row items-center gap-2">
                            {logos[org.id] ? (
                              <div className="w-[40px] h-[40px] border rounded-full overflow-hidden flex items-center justify-center">
                                <img
                                  src={logos[org.id]}
                                  alt="Organization Logo"
                                  loading="lazy"
                                  className="object-fill"
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
                            <CheckIcon
                              size={16}
                              className="text-green-600 cursor-pointer"
                              onClick={() => {
                                console.log(org);
                                updateActiveStatusOrganization(
                                  { ...org, active: !org.active },
                                  page
                                );
                              }}
                            />
                          ) : (
                            <XIcon
                              size={16}
                              className="text-rose-600 cursor-pointer"
                              onClick={() => {
                                console.log(org);
                                updateActiveStatusOrganization(
                                  { ...org, active: !org.active },
                                  page
                                );
                              }}
                            />
                          )}
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-3">
                            {org.locations.map((loc) => (
                              <div key={loc.id}>
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
                                      <p>{loc.address.detail || "..."}</p>
                                      <p>
                                        {loc.address.city || "..."},{" "}
                                        {loc.address.state || "..."},{" "}
                                        {loc.address.zip || "..."}
                                      </p>
                                    </div>
                                  </div>
                                </span>
                              </div>
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        <NotFound text={"No Organization record found"} />
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

      <ProviderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        providers={selectedProviders}
      />
    </>
  );
};

export default OrganizationsTable;
