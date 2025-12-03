'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Clock } from "lucide-react";
import { Navbar } from '@/components/layout/Navbar';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/forms/button";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function Gallery() {
    const router = useRouter();
    const [circuits, setCircuits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilter, setActiveFilter] = useState("featured");
    const { user } = useAuth();

    const fetchCircuits = useCallback(async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            search,
            sort,
            type,
            page,
            limit: 9,
        });

        const headers = {};
        if (user) {
            const token = localStorage.getItem('token');
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const res = await fetch(`http://localhost:5001/api/circuits/public?${queryParams}`, {
                headers,
            });

            if (res.ok) {
                const data = await res.json();
                setCircuits(data.circuits);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch gallery circuits:", error);
        }
        setLoading(false);
    }, [user, search, sort, type, page]);

    useEffect(() => {
        fetchCircuits();
    }, [fetchCircuits]);

    const handleOpenCircuit = (id) => {
        router.push(`/editor?id=${id}`);
    };

    const filterButtons = [
        { key: "featured", label: "Featured", icon: Sparkles },
        { key: "popular", label: "Popular", icon: TrendingUp },
        { key: "recent", label: "Recent", icon: Clock },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="container py-8 px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="font-display text-4xl font-bold tracking-tight">
                        Circuit Gallery
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                        Explore circuits created by the community. Get inspired, learn, and remix designs.
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search circuits..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/30 p-1">
                        {filterButtons.map((filter) => (
                            <Button
                                key={filter.key}
                                variant={activeFilter === filter.key ? "secondary" : "ghost"}
                                size="sm"
                                className="gap-2"
                                onClick={() => {
                                    setActiveFilter(filter.key);
                                    // Map filter to sort logic if needed
                                    if (filter.key === 'recent') setSort('newest');
                                    // Add logic for popular/featured if backend supports it
                                }}
                            >
                                <filter.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{filter.label}</span>
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <>
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {circuits.map((circuit, index) => (
                                <GalleryCard
                                    key={circuit._id}
                                    circuit={circuit}
                                    index={index}
                                    onClick={handleOpenCircuit}
                                />
                            ))}
                        </div>

                        {/* Empty state */}
                        {circuits.length === 0 && (
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
    );
}
