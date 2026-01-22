'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";

export type AthleteRow = {
    athleteId: string;
    athleteName: string;
    country: string;
    sport: string;
    event: string;
    medalCount: number;
    goldMedals: number;
    silverMedals: number;
    bronzeMedals: number;
    totalPoints: number;
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

const headers: (keyof AthleteRow)[] = [
    "athleteId",
    "athleteName",
    "country",
    "sport",
    "medalCount",
    "totalPoints",
];

export default function AthleteTable({ initialSectorRow }: Props) {
    let apiUrl = 'http://localhost:3001/dummy-table-data'
    const [rows, setRows] = useState<AthleteRow[]>(initialSectorRow);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof AthleteRow | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(false);
    const isInitialRender=useRef(true);
    // Fetch data when query changes
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false
            return;
        }
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(apiUrl, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error("Network error");
                let response = await res.json();
                const data = response.data || [];
                // Filter by query if provided
                const filtered = query ? data.filter((row: AthleteRow) => 
                    row.athleteName.toLowerCase().includes(query.toLowerCase()) ||
                    row.country.toLowerCase().includes(query.toLowerCase()) ||
                    row.sport.toLowerCase().includes(query.toLowerCase())
                ) : data;
                setRows(Array.isArray(filtered) ? filtered : []);
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

    const handleSort = (key: keyof AthleteRow) => {
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
                    placeholder="Search athletes..."
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
                        {sortedRows.map((r) => (
                            <tr key={r.athleteId}>
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
