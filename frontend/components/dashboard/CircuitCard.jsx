import { motion } from "framer-motion";
import { MoreHorizontal, Trash2, Copy, ExternalLink, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Button } from "@/components/ui/forms/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/overlay/dropdown-menu";

export function CircuitCard({
    circuit,
    onOpen,
    onDelete,
    onDuplicate,
    index = 0,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            <Card
                className="group overflow-hidden border-border/50 bg-card/50 hover:bg-card/80 transition-colors cursor-pointer"
                onClick={() => onOpen?.(circuit._id)}
            >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-secondary/50 circuit-grid overflow-hidden">
                    {circuit.thumbnail ? (
                        <img
                            src={circuit.thumbnail}
                            alt={circuit.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick actions on hover */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen?.(circuit._id);
                            }}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-display font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                {circuit.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(circuit.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(circuit.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            {circuit.nodeCount !== undefined && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {circuit.nodeCount} components
                                </p>
                            )}
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpen?.(circuit._id);
                                    }}
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDuplicate?.(circuit._id);
                                    }}
                                >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.(circuit._id);
                                    }}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
