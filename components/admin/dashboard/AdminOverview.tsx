import {formatCurrency} from "@/lib/formatCurrency";
import {MetricCard} from "@/components/admin/dashboard/MetricCard";
import {LineChartComponent} from "@/components/charts/LineChartComponent";
import {getDashboardData} from "@/supabase/dashboard/DashboardQuery";



export async function AdminOverview() {
    const {
        totalSales,
        totalOrders,
        activeOrders,
        totalProducts,
        totalUsers,
        totalCustomers,
        orderEvolution,
        salesEvolution,
        customerEvolution,
    } = await getDashboardData();

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-8">Overblik over dine nøgletal.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                <MetricCard
                    title="Total Omsætning"
                    value={formatCurrency(totalSales, "DKK")}
                />
                <MetricCard
                    title="Antal Ordrer"
                    value={totalOrders}
                />
                <MetricCard
                    title="Aktive Ordrer"
                    value={activeOrders}
                />
                <MetricCard
                    title="Antal Brugere"
                    value={totalUsers}
                />
                <MetricCard
                    title="Antal Kunder"
                    value={totalCustomers}
                />
                <MetricCard
                    title="Antal Produkter"
                    value={totalProducts}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LineChartComponent
                    title="Udvikling - Antal Ordre"
                    dataset={orderEvolution}
                    dataKeyX="date"
                    series={[
                        {
                            dataKey: "orders",
                            label: "Antal Ordrer",
                            color: "#10B981",
                        },
                    ]}
                />
                <LineChartComponent
                    title="Udvikling - Omsætning"
                    dataset={salesEvolution}
                    dataKeyX="date"
                    series={[
                        {
                            dataKey: "revenue",
                            label: "Total Omsætning",
                            color: "#3B82F6",
                        },
                    ]}
                />
                <LineChartComponent
                    title="Udvikling - Antal Kunder"
                    dataset={customerEvolution}
                    dataKeyX="date"
                    series={[
                        {
                            dataKey: "customers",
                            label: "Antal Kunder",
                            color: "#F59E0B",
                        },
                    ]}
                />
            </div>
        </div>
    )
}