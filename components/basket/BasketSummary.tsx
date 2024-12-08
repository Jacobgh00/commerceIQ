import {Renderable} from "@/utilities/ComponentUtilities";
import useBasketStore from "@/store/Store";
import {cn} from "@/lib/utils";
import {SignInButton} from "@clerk/nextjs";


export function BasketSummary(props: {
    handleCheckout: () => void;
    isLoading: boolean;
    isSignedIn: boolean | undefined;
}): Renderable {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const totalPrice = useBasketStore.getState().getTotalPrice();

    return (
        <div
            className={cn(
                "w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded",
                "order-first lg:order-last fixed bottom-0 left-0 lg:left-auto"
            )}
        >
            <h3 className="text-xl font-semibold">Ordre liste</h3>
            <div className="mt-4 space-y-2">
                <p className="flex justify-between">
                    <span>Varer:</span>
                    <span>
                        {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                </p>
                <p className="flex justify-between text-2xl font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>Kr. {totalPrice.toFixed(2)}</span>
                </p>
            </div>

            {props.isSignedIn ? (
                <button
                    type="button"
                    onClick={props.handleCheckout}
                    disabled={props.isLoading}
                    className="mt-4 w-full bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 disabled:bg-gray-400 transition-colors"
                >
                    {props.isLoading ? "Vent venligst..." : "Gå til betaling"}
                </button>
            ): (
                <SignInButton mode="modal">
                    <button className="mt-4 w-full bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors">
                        Log ind for at betale
                    </button>
                </SignInButton>
            )}
        </div>
    );
}