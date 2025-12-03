'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/forms/button";
import { Input } from "@/components/ui/forms/input";
import EditorCanvas from '../../editor/EditorCanvas';
import { EditorSidebar } from '@/components/editor/EditorSidebar';
import { EditorToolbar } from '@/components/editor/EditorToolbar';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

function EditorContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const [initialData, setInitialData] = useState(null);
    const [circuitName, setCircuitName] = useState('Untitled Circuit');
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(false);
    const [type, setType] = useState('Combinational');
    const [description, setDescription] = useState('');

    const canvasRef = useRef(null);
    const circuitId = searchParams.get('id');

    useEffect(() => {
        const fetchCircuit = async () => {
            if (circuitId && user) {
                try {
                    const data = await api.get(`/api/circuits/${circuitId}`);
                    setInitialData(data);
                    setCircuitName(data.name);
                    setIsPublic(data.isPublic || false);
                    setType(data.type || 'Combinational');
                    setDescription(data.description || '');
                } catch (error) {
                    console.error("Failed to fetch circuit:", error);
                }
            }
            setLoading(false);
        };

        fetchCircuit();
    }, [circuitId, user]);

    const handleSave = async () => {
        if (!user) return alert('Please sign in to save');

        const { nodes, edges } = canvasRef.current.getCircuitData();

        const body = {
            name: circuitName,
            nodes,
            edges,
            isPublic,
            type,
            description,
        };

        if (circuitId) {
            body._id = circuitId;
        }

        try {
            const data = await api.post('/api/circuits/save', body);
            alert('Circuit saved!');
            if (!circuitId) {
                router.push(`/editor?id=${data._id}`);
            }
        } catch (error) {
            console.error("Failed to save circuit:", error);
            alert('Error saving circuit');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 z-20"
            >
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Input
                            value={circuitName}
                            onChange={(e) => setCircuitName(e.target.value)}
                            className="h-8 w-48 bg-transparent border-transparent hover:border-border focus:border-primary text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Settings/Metadata Popover could go here for Description/Type/Public */}
                    <div className="flex items-center gap-2 mr-4 text-sm">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            Public
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="bg-transparent border border-border rounded px-2 py-1 text-xs"
                        >
                            <option value="Combinational">Combinational</option>
                            <option value="Sequential">Sequential</option>
                        </select>
                    </div>

                    <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="default" size="sm" onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
                        Save
                    </Button>
                </div>
            </motion.header>

            {/* Canvas area */}
            <div className="flex-1 relative">
                <EditorToolbar
                    onAddNode={(type) => canvasRef.current?.addNode(type)}
                    onSave={handleSave}
                    onZoomIn={() => canvasRef.current?.zoomIn()}
                    onZoomOut={() => canvasRef.current?.zoomOut()}
                    onFitView={() => canvasRef.current?.fitView()}
                    onClear={() => canvasRef.current?.clear()}
                />

                <EditorSidebar onAddNode={(type) => canvasRef.current?.addNode(type)} />

                <EditorCanvas ref={canvasRef} initialData={initialData} />
            </div>
        </div>
    );
}

import AuthGuard from '@/components/auth/AuthGuard';

export default function EditorPage() {
    return (
        <AuthGuard>
            <Suspense fallback={<div className="p-8 text-center">Loading editor...</div>}>
                <EditorContent />
            </Suspense>
        </AuthGuard>
    );
}
