import AppointmentTable from "./_components/AppointmentTable";
import Header from "./_components/Header";
import OrganizationsTable from "./_components/OrganizationsTable";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 flex flex-col gap-6">
        <OrganizationsTable />

        <AppointmentTable />
      </main>
    </div>
  );
}
