import {AdminSidebar} from "@/components/admin/AdminSidebar";
import {AdminOverview} from "@/components/admin/dashboard/AdminOverview";
import {redirect} from "next/navigation";
import {isAdmin} from "@/clerk/User";

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ section: string }>
}) {
    const { section } = await searchParams
    const activeSection = section || "overview"

    const admin = await isAdmin()

    if (!admin) {
        redirect("/")
    }

    return (
        <div className="flex">
            <div className="hidden md:flex">
                <AdminSidebar activeSection={activeSection}  />
            </div>
            <div className="flex-1 p-6 bg-gray-100">
                {activeSection === "overview" && <AdminOverview />}
                {activeSection === "products" && <p>Produkter</p>}
                {activeSection === "orders" && <p>Ordrer</p>}
            </div>
        </div>
    )
}