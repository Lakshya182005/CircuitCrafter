'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/forms/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
            <div className="text-center space-y-4">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold">Page not found</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="pt-4">
                    <Link href="/">
                        <Button variant="default" size="lg">
                            Return to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
