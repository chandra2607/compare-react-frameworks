'use client';
import React, { useEffect, useMemo, useState } from "react";

export type SectorRow = {
    sectorcode: string;
    sectorname: string;
    totalmcap: string;
    stockcount: string;
    pe_avg: string;
    totalvolume:string;
};

type Props = {
    initialSectorRow: [];
};

function formatMaybeNumber(value: string) {
    if (value == null) return "";
    const asNum = Number(value);
    if (!Number.isFinite(asNum)) return value;
    return asNum;
}

const headers: (keyof SectorRow)[] = [
    "sectorcode",
    "sectorname",
    "stockcount",
    "totalvolume",
];

export default function SectorTable({ initialSectorRow }: Props) {
    let apiUrl='https://www.indiainfoline.com/cms-api/v1/public/market/sectorperformance'
    const [rows, setRows] = useState<SectorRow[]>(initialSectorRow);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof SectorRow | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(false);

    // Fetch data when query changes
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}?exchange=${query.length%2===0?'nse':'bse'}`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error("Network error");
                let  data = await res.json();
                data=data.response.data.SectorPerformanceList.SectorPerformance;
                setRows(Array.isArray(data) ? data : []);
            } catch (e) {
                if ((e as any).name !== "AbortError") console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => controller.abort();
    }, [apiUrl, query]);

    // Sort rows
    const sortedRows = useMemo(() => {
        if (!sortBy) return rows;
        return [...rows].sort((a, b) => {
            const aVal = Number(a[sortBy]) || a[sortBy];
            const bVal = Number(b[sortBy]) || b[sortBy];
            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [rows, sortBy, sortOrder]);

    const handleSort = (key: keyof SectorRow) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    };

    return (
        <div>
            <div>
                <input
                    placeholder="Search sectors..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {loading && <p>Loading...</p>}

            {!loading && (
                <table>
                    <thead>
                        <tr>
                            {headers.map((h) => (
                                <th key={h} onClick={() => handleSort(h)}>
                                    {h}
                                    {sortBy === h ? (sortOrder === "asc" ? " ▲" : " ▼") : ""}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRows && sortedRows.map((r) => (
                            <tr key={r.sectorcode}>
                                {headers.map((h) => (
                                    <td key={h}>{formatMaybeNumber(r[h])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
