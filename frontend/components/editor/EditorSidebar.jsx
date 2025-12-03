import { motion } from "framer-motion";
import {
    CircleDot,
    Circle,
    CircleSlash,
    ToggleLeft,
    Lightbulb,
    ChevronLeft,
    ChevronRight,
    Binary,
    Cpu,
    Combine,
    ArrowRightLeft
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/forms/button";
import { cn } from "@/lib/utils";

const components = [
    {
        type: "and",
        label: "AND Gate",
        icon: CircleDot,
        color: "bg-node-and/20 border-node-and/50 text-node-and",
        description: "Output HIGH when all inputs are HIGH",
    },
    {
        type: "or",
        label: "OR Gate",
        icon: Circle,
        color: "bg-node-or/20 border-node-or/50 text-node-or",
        description: "Output HIGH when any input is HIGH",
    },
    {
        type: "not",
        label: "NOT Gate",
        icon: CircleSlash,
        color: "bg-node-not/20 border-node-not/50 text-node-not",
        description: "Inverts the input signal",
    },
    {
        type: "xor",
        label: "XOR Gate",
        icon: ArrowRightLeft,
        color: "bg-purple-500/20 border-purple-500/50 text-purple-500",
        description: "Output HIGH when inputs are different",
    },
    {
        type: "nand",
        label: "NAND Gate",
        icon: Combine,
        color: "bg-red-500/20 border-red-500/50 text-red-500",
        description: "Output LOW when all inputs are HIGH",
    },
    {
        type: "nor",
        label: "NOR Gate",
        icon: Ban,
        color: "bg-orange-500/20 border-orange-500/50 text-orange-500",
        description: "Output LOW when any input is HIGH",
    },
    {
        type: "xnor",
        label: "XNOR Gate",
        icon: Cpu,
        color: "bg-pink-500/20 border-pink-500/50 text-pink-500",
        description: "Output HIGH when inputs are same",
    },
    {
        type: "input",
        label: "Input",
        icon: ToggleLeft,
        color: "bg-node-input/20 border-node-input/50 text-node-input",
        description: "Toggle switch for input signals",
    },
    {
        type: "output",
        label: "Output",
        icon: Lightbulb,
        color: "bg-node-output/20 border-node-output/50 text-node-output",
        description: "LED indicator for output",
    },
];

// Helper icon for NOR since Ban might not be imported or correct
function Ban(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
        </svg>
    )
}

export function EditorSidebar({ onAddNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleDragStart = (event, type) => {
        event.dataTransfer.setData('application/reactflow', type);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                isCollapsed ? "w-14" : "w-56"
            )}
        >
            <div className="glass-panel p-3 relative max-h-[80vh] overflow-y-auto custom-scrollbar">
                {/* Collapse toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-card border border-border z-20"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-3 w-3" />
                    ) : (
                        <ChevronLeft className="h-3 w-3" />
                    )}
                </Button>

                {!isCollapsed && (
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Components
                    </h3>
                )}

                <div className="space-y-2">
                    {components.map((component, index) => (
                        <motion.div
                            key={component.type}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "w-full flex items-center gap-3 p-2 rounded-lg border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-grab active:cursor-grabbing",
                                component.color
                            )}
                            draggable
                            onDragStart={(e) => handleDragStart(e, component.type)}
                            onClick={() => onAddNode?.(component.type)}
                        >
                            <component.icon className="h-5 w-5 shrink-0" />
                            {!isCollapsed && (
                                <div className="text-left">
                                    <p className="text-sm font-medium text-foreground">
                                        {component.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                        {component.description}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
