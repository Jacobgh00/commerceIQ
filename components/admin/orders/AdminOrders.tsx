import {getOrders} from "@/supabase/order/OrderQuery";
import {SearchBar} from "@/components/header/SearchBar";
import {OrderTable} from "@/components/admin/orders/OrderTable";

export default async function AdminOrders({
    searchParams,
}: {
    searchParams: { query?: string; page?: string };
}) {
    const query = searchParams.query || "";
    const currentPage = parseInt(searchParams.page || "1", 10);

    if (isNaN(currentPage) || currentPage < 1) {
        throw new Error("Invalid page number");
    }

    const { orders, totalPages } = await getOrders(query, currentPage);
    console.log("Orders", orders);
    console.log("Total pages", totalPages);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Ordre</h2>
            <SearchBar
                className="mx-0 my-6 max-w-lg"
                action={`/admin?section=orders`}
                placeholder="Søg efter ordre..."
                section="orders"
            />
            <OrderTable
                orders={orders}
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/admin?section=orders`}
            />
        </div>
    )
}