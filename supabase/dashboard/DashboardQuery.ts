import {getSalesEvolution, getTotalSales} from "@/supabase/sale/SaleQuery";
import {getOrderCounts, getOrderEvolution} from "@/supabase/order/OrderQuery";
import {getProductCount} from "@/supabase/products/ProductQuery";
import {getCustomerEvolution, getTotalCustomers, getTotalUsers} from "@/supabase/customers/CustomerQuery";

export async function getDashboardData() {
    const [totalSales, { totalOrders, activeOrders }, totalProducts, totalUsers, totalCustomers, orderEvolution, salesEvolution, customerEvolution] = await Promise.all([
        getTotalSales(),
        getOrderCounts(),
        getProductCount(),
        getTotalUsers(),
        getTotalCustomers(),
        getOrderEvolution(),
        getSalesEvolution(),
        getCustomerEvolution(),
    ]);

    return {
        totalSales,
        totalOrders,
        activeOrders,
        totalProducts,
        totalUsers,
        totalCustomers,
        orderEvolution,
        salesEvolution,
        customerEvolution,
    };
}