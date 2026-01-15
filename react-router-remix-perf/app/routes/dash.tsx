import React from 'react'
import { Outlet, NavLink } from "react-router";
function DashIndex() {
    return (
        <div className="flex h-screen bg-neutral-950 text-white">
            <aside className="w-64 bg-neutral-900/80 backdrop-blur border-r border-neutral-800 p-6">
                <div className="text-lg font-semibold mb-8 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    Fakebooks
                </div>


                <nav className="space-y-1 text-sm">
                    {['Dashboard', 'Accounts', 'Sales', 'Expenses', 'Reports'].map(item => (
                        <NavLink
                            key={item}
                            to={item === 'Sales' ? '/dash/sales' : '#'}
                            className={({ isActive }) =>
                                `block rounded-md px-3 py-2 transition ${isActive
                                    ? 'bg-blue-500/15 text-blue-300'
                                    : 'text-neutral-400 hover:text-neutral-200'
                                }`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </nav>
            </aside>


            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default DashIndex