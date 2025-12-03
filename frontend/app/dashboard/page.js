'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from "framer-motion";
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Navbar } from '@/components/layout/Navbar';
import { CircuitCard } from '@/components/dashboard/CircuitCard';
import { NewCircuitCard } from '@/components/dashboard/NewCircuitCard';
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/forms/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/overlay/dropdown-menu";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import AuthGuard from '@/components/auth/AuthGuard';

export default function Dashboard() {
    const router = useRouter();
    const [circuits, setCircuits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [viewMode, setViewMode] = useState("grid");
    const { user } = useAuth();

    const fetchCircuits = useCallback(async () => {
        if (user) {
            setLoading(true);
            const token = localStorage.getItem('token');
            const queryParams = new URLSearchParams({
                search,
                sort,
                type,
                page,
                limit: 9,
            });

            try {
                const res = await fetch(`http://localhost:5001/api/circuits/mine?${queryParams}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setCircuits(data.circuits);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error("Failed to fetch circuits:", error);
            }
            setLoading(false);
        }
    }, [user, search, sort, type, page]);

    useEffect(() => {
        fetchCircuits();
    }, [fetchCircuits]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this circuit?')) {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5001/api/circuits/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchCircuits();
            }
        }
    };

    const handleDuplicate = async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5001/api/circuits/copy/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            fetchCircuits();
        }
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />

                <main className="container py-8 px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-display text-3xl font-bold tracking-tight">
                            Your Circuits
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Create, edit, and manage your digital circuit designs
                        </p>
                    </motion.div>

                    {/* Toolbar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-4 mb-6"
                    >
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search circuits..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center rounded-lg border border-border bg-secondary/30 p-1">
                                <Button
                                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "secondary" : "ghost"}
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSort('newest')}>Newest</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSort('oldest')}>Oldest</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSort('az')}>A-Z</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSort('za')}>Z-A</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : (
                        <>
                            <div
                                className={`grid gap-4 ${viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    : "grid-cols-1"
                                    }`}
                            >
                                <NewCircuitCard onClick={() => router.push('/editor')} />

                                {circuits.map((circuit, index) => (
                                    <CircuitCard
                                        key={circuit._id}
                                        circuit={circuit}
                                        index={index + 1}
                                        onOpen={(id) => router.push(`/editor?id=${id}`)}
                                        onDelete={handleDelete}
                                        onDuplicate={handleDuplicate}
                                    />
                                ))}
                            </div>

                            {/* Empty state */}
                            {circuits.length === 0 && search && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <p className="text-muted-foreground">
                                        No circuits found matching "{search}"
                                    </p>
                                </motion.div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    <Button
                                        variant="outline"
                                        disabled={page === 1}
                                        onClick={() => setPage(p => p - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <span className="px-4 py-2 flex items-center">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        disabled={page === totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </AuthGuard>
    );
}
