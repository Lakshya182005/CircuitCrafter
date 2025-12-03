import { motion } from "framer-motion";
import { Heart, Eye, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Avatar, AvatarFallback } from "@/components/ui/data-display/avatar";

export function GalleryCard({ circuit, onClick, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            <Card
                className="group overflow-hidden cursor-pointer border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
                onClick={() => onClick?.(circuit._id)}
            >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-secondary/50 circuit-grid overflow-hidden">
                    {circuit.featured && (
                        <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium">
                            Featured
                        </div>
                    )}

                    {circuit.thumbnail ? (
                        <img
                            src={circuit.thumbnail}
                            alt={circuit.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex gap-2 opacity-30">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-6 h-6 rounded bg-primary/30 border border-primary/20"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-4">
                    <h3 className="font-display font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {circuit.name}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-border">
                                <AvatarFallback className="bg-secondary text-xs">
                                    {circuit.userId?.name?.[0] || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                                {circuit.userId?.name || "Unknown"}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {/* <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {circuit.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {circuit.views || 0}
              </span> */}
                            <span className="flex items-center gap-1">
                                {circuit.type}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
