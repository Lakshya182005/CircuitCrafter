'use client';

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/card";

export function AuthCard({ title, description, children, footer }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Background effects */}
            <div className="absolute inset-0 circuit-grid opacity-30" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                    >
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
                            <Cpu className="h-7 w-7 text-primary" />
                            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-50" />
                        </div>
                        <span className="font-display text-2xl font-bold tracking-tight">
                            Circuit<span className="text-primary">Crafter</span>
                        </span>
                    </motion.div>
                </div>

                <Card className="border-border/30 bg-card/50 backdrop-blur-xl">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">{title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex justify-center">
                        {children}
                    </CardContent>
                </Card>

                {footer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-center"
                    >
                        {footer}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
