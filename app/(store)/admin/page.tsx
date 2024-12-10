import {AdminOverview} from "@/components/admin/dashboard/AdminOverview";
import {redirect} from "next/navigation";
import {isAdmin} from "@/clerk/User";
import {AdminProducts} from "@/components/admin/products/AdminProducts";
import {CreateProductForm} from "@/components/admin/products/CreateProductForm";
import AdminOrders from "@/components/admin/orders/AdminOrders";
import {AdminLayout} from "@/components/admin/AdminLayout";


export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ section: string; query?: string; page?: string }>
}) {
    const {section, query, page} = await searchParams;
    const activeSection = section || "overview"

    const admin = await isAdmin()

    if (!admin) {
        redirect("/")
    }

    return (
        <AdminLayout>
            {activeSection === "overview" && <AdminOverview/>}
            {activeSection === "products" && (
                <>
                    <AdminProducts query={query}/>
                    <hr className="my-8"/>
                    <h3 className="text-xl font-bold mb-4">Opret nyt produkt</h3>
                    <CreateProductForm/>
                </>
            )}
            {activeSection === "orders" && <AdminOrders searchParams={{query, page}}/>}
        </AdminLayout>
    )
}