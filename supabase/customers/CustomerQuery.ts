import {supabase} from "@/supabase/server";

const CLERK_API_URL = "https://api.clerk.dev/v1/users";
const CLERK_API_KEY = process.env.CLERK_SECRET_KEY;

export async function getTotalUsers(): Promise<number> {
    if (!CLERK_API_KEY) {
        console.error("Clerk API key is missing. Please set CLERK_API_KEY in your environment variables.");
        return 0;
    }

    try {
        const response = await fetch(CLERK_API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${CLERK_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Error fetching users from Clerk API:", response.statusText);
            return 0;
        }

        const users = await response.json();
        return users.length
    } catch (error) {
        console.error("Error fetching users from Clerk API:", error);
        return 0;
    }
}

export async function getTotalCustomers(): Promise<number> {
    try {
        const { data, error } = await supabase
            .from("orders")
            .select("clerk_user_id")
            .neq("clerk_user_id", null)


        if (error) {
            console.error("Error fetching customers from orders table:", error.message);
            return 0
        }

        if (!data) {
            return 0
        }

        const uniqueCustomers = new Set(data.map((order) => order.clerk_user_id));
        return uniqueCustomers.size
    } catch (error) {
        console.error("Error fetching total customers:", error);
        return 0;
    }
}

export async function getCustomerEvolution() {
    try {
        const { data, error } = await supabase
            .from("orders")
            .select("clerk_user_id, created_at")
            .neq("clerk_user_id", null);

        if (error) {
            console.error("Error fetching customer evolution:", error.message);
            return [];
        }

        if (!data || data.length === 0) {
            return [];
        }

        const groupedByDate = data.reduce((acc: Record<string, Set<string>>, order) => {
            const date = new Date(order.created_at).toISOString().split("T")[0];
            if (!acc[date]) {
                acc[date] = new Set();
            }
            acc[date].add(order.clerk_user_id);
            return acc;
        }, {});

        return Object.entries(groupedByDate)
            .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
            .reduce(
                (acc: { date: string; customers: number }[], [date, customerSet]) => {
                    const cumulative = acc.length > 0 ? acc[acc.length - 1].customers : 0;
                    acc.push({date, customers: cumulative + customerSet.size});
                    return acc;
                },
                []
            );

    } catch (error) {
        console.error("Error fetching customer evolution:", error);
        return [];
    }
}