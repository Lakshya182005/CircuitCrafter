import { motion } from "framer-motion";
import {
    CircleDot,
    Circle,
    CircleSlash,
    ToggleLeft,
    Lightbulb,
    Save,
    FolderOpen,
    Undo,
    Redo,
    ZoomIn,
    ZoomOut,
    Maximize,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/forms/button";
import { Separator } from "@/components/ui/layout/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/overlay/tooltip";

export function EditorToolbar({
    onAddNode,
    onSave,
    onLoad,
    onUndo,
    onRedo,
    onZoomIn,
    onZoomOut,
    onFitView,
    onClear,
}) {
    const gateButtons = [
        {
            icon: CircleDot,
            label: "AND Gate",
            onClick: () => onAddNode?.("and"),
            color: "text-node-and",
        },
        {
            icon: Circle,
            label: "OR Gate",
            onClick: () => onAddNode?.("or"),
            color: "text-node-or",
        },
        {
            icon: CircleSlash,
            label: "NOT Gate",
            onClick: () => onAddNode?.("not"),
            color: "text-node-not",
        },
    ];

    const ioButtons = [
        {
            icon: ToggleLeft,
            label: "Input Switch",
            onClick: () => onAddNode?.("input"),
            color: "text-node-input",
        },
        {
            icon: Lightbulb,
            label: "Output LED",
            onClick: () => onAddNode?.("output"),
            color: "text-node-output",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
        >
            <div className="glass-panel flex items-center gap-1 p-2">
                {/* File operations */}
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onSave}>
                                <Save className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Save Circuit</TooltipContent>
                    </Tooltip>

                    {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onLoad}>
                <FolderOpen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Load Circuit</TooltipContent>
          </Tooltip> */}
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Undo/Redo */}
                {/* <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onUndo}>
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onRedo}>
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" /> */}

                {/* Logic Gates */}
                <div className="flex items-center gap-1">
                    {gateButtons.map((button) => (
                        <Tooltip key={button.label}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={button.onClick}
                                    className={`hover:${button.color}`}
                                >
                                    <button.icon className={`h-4 w-4 ${button.color}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{button.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* I/O Components */}
                <div className="flex items-center gap-1">
                    {ioButtons.map((button) => (
                        <Tooltip key={button.label}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={button.onClick}
                                    className={`hover:${button.color}`}
                                >
                                    <button.icon className={`h-4 w-4 ${button.color}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{button.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Zoom controls */}
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onZoomOut}>
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Zoom Out</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onZoomIn}>
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Zoom In</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onFitView}>
                                <Maximize className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Fit to View</TooltipContent>
                    </Tooltip>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Clear */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClear}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear Canvas</TooltipContent>
                </Tooltip>
            </div>
        </motion.div>
    );
}
