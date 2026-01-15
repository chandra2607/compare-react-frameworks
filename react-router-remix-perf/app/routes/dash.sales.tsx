import { Outlet, NavLink } from "react-router";


export default function SalesLayout() {
    return (
        <div className="p-10">
           <h1 className="text-4xl font-semibold tracking-tight mb-6">Sales</h1>
            <div className="border-b border-neutral-800 mb-8">
                <nav className="flex gap-6 text-sm">
                    {['overview', 'subscriptions', 'invoices', 'customers', 'deposits'].map(tab => (
                        <NavLink
                            key={tab}
                            to={tab === 'overview' ? '.' : tab}
                            end
                            className={({ isActive }) =>
                                `pb-4 transition ${isActive
                                    ? 'text-neutral-100 border-b-2 border-neutral-100'
                                    : 'text-neutral-500 hover:text-neutral-300'
                                }`
                            }
                        >
                            {tab[0].toUpperCase() + tab.slice(1)}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <Outlet />
        </div>
    );
}