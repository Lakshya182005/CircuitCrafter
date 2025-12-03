"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, LayoutDashboard, Compass } from "lucide-react";
import { Button } from "@/components/ui/forms/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserMenu } from "./UserMenu";

export function Navbar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/gallery", label: "Gallery", icon: Compass },
    ];

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
        >
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <Cpu className="h-5 w-5 text-primary" />
                        <div className="absolute inset-0 rounded-lg bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="font-display text-lg font-semibold tracking-tight">
                        Circuit<span className="text-primary">Crafter</span>
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href}>
                                <Button
                                    variant="ghost"
                                    className={`gap-2 ${isActive
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Menu */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <UserMenu />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href="/sign-in">
                            <Button variant="ghost">Sign in</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">Get Started</Button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.header>
    );
}
