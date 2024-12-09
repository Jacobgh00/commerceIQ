import {AdminSidebar} from "@/components/admin/AdminSidebar";
import {AdminOverview} from "@/components/admin/dashboard/AdminOverview";
import {redirect} from "next/navigation";
import {isAdmin} from "@/clerk/User";
import {AdminProducts} from "@/components/admin/products/AdminProducts";
import {CreateProductForm} from "@/components/admin/products/CreateProductForm";

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ section: string; query?: string }>
}) {
    const { section, query } = await searchParams;
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
                {activeSection === "products" && (
                    <>
                        <AdminProducts query={query}/>
                        <hr className="my-8"/>
                        <h3 className="text-xl font-bold mb-4">Opret nyt produkt</h3>
                        <CreateProductForm />
                    </>
                )}
                {activeSection === "orders" && <p>Ordrer</p>}
            </div>
        </div>
    )
}