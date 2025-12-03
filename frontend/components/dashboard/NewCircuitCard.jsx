import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/layout/card";

export function NewCircuitCard({ onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                className="group cursor-pointer overflow-hidden border-dashed border-2 bg-transparent hover:bg-accent/5 transition-colors"
                onClick={onClick}
            >
                <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6">
                    <div className="relative">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                            <Plus className="h-7 w-7 text-primary" />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-center">
                        <p className="font-display font-medium text-foreground group-hover:text-primary transition-colors">
                            New Circuit
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Start from scratch
                        </p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
