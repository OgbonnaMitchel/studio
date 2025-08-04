import DataManagementTabs from "@/components/admin/DataManagementTabs";

export default function ManageDataPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="font-headline text-3xl font-bold tracking-tight">System Data Management</h1>
                <p className="text-muted-foreground">
                    Use the tabs below to manage foundational data for the application.
                </p>
            </header>
            <DataManagementTabs />
        </div>
    );
}
