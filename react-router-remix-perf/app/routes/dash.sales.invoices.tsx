import { Link, Outlet, useNavigation } from "react-router";


const invoices = [
    { id: '102000', name: 'Santa Monica', amount: '$10,800' },
    { id: '102001', name: 'Stankonia', amount: '$8,000' },
    { id: '102002', name: 'Ocean Avenue', amount: '$9,500' },
];


export default function Invoices() {
    const navigation = useNavigation();
    const isNavigating =
        navigation.state === "loading";
    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
                {invoices.map(inv => (
                    <Link
                        to={inv.id}
                        className="block rounded-xl bg-neutral-900/70 border border-neutral-800 p-5 hover:bg-neutral-900 transition"
                    >
                        <div className="font-medium text-neutral-100">{inv.name}</div>
                        <div className="text-neutral-400 text-sm mt-1">{inv.amount}</div>
                    </Link>
                ))}
            </div>

            <div className="rounded-xl bg-neutral-900/70 border border-neutral-800 p-6">
                {isNavigating && (
                    <p className="mb-4 text-xs text-blue-400">
                        Navigating…
                    </p>
                )}
                <Outlet />
            </div>
        </div>
    );
}