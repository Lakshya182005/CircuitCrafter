'use client';

import React, { useState, useCallback, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeAND from './components/NodeAND';
import NodeOR from './components/NodeOR';
import NodeNOT from './components/NodeNOT';
import NodeXOR from './components/NodeXOR';
import NodeNAND from './components/NodeNAND';
import NodeNOR from './components/NodeNOR';
import NodeXNOR from './components/NodeXNOR';

const nodeTypes = {
    and: NodeAND,
    or: NodeOR,
    not: NodeNOT,
    xor: NodeXOR,
    nand: NodeNAND,
    nor: NodeNOR,
    xnor: NodeXNOR,
};

const initialNodes = [];
let id = 1;
const getId = () => `dndnode_${id++}`;

const EditorCanvas = forwardRef(({ initialData, onSave }, ref) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialData?.nodes || initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialData?.edges || []);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    // We need useReactFlow for zoom controls, but it must be used inside ReactFlowProvider.
    // Since EditorCanvas is wrapped in ReactFlowProvider, we can use it here if we move the logic inside.
    // However, the wrapper is in the export default. 
    // Let's use the instance we get from onInit for now, or use useReactFlow inside a child component if needed.
    // Actually, reactFlowInstance has zoomIn, zoomOut, fitView.

    useImperativeHandle(ref, () => ({
        addNode: (type) => {
            const position = {
                x: Math.random() * 400,
                y: Math.random() * 400,
            };
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        zoomIn: () => reactFlowInstance?.zoomIn(),
        zoomOut: () => reactFlowInstance?.zoomOut(),
        fitView: () => reactFlowInstance?.fitView(),
        clear: () => {
            if (confirm('Are you sure you want to clear the canvas?')) {
                setNodes([]);
                setEdges([]);
            }
        },
        getCircuitData: () => ({ nodes, edges }),
    }));

    useEffect(() => {
        if (initialData) {
            setNodes(initialData.nodes || []);
            setEdges(initialData.edges || []);
        }
    }, [initialData, setNodes, setEdges]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    return (
        <div className="dndflow w-full h-full flex flex-col bg-background">
            <div className="flex-grow h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    fitView
                    snapToGrid
                    snapGrid={[20, 20]}
                    defaultEdgeOptions={{
                        type: "smoothstep",
                        animated: true,
                        style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
                    }}
                    className="bg-background"
                >
                    <Controls className="!bg-card/80 !backdrop-blur-xl !border !border-border !rounded-lg" />
                    <MiniMap
                        className="!bg-card/80 !backdrop-blur-xl !border !border-border !rounded-lg"
                        nodeColor={(node) => {
                            switch (node.type) {
                                case "and": return "hsl(var(--node-and))";
                                case "or": return "hsl(var(--node-or))";
                                case "not": return "hsl(var(--node-not))";
                                case "input": return "hsl(var(--node-input))";
                                case "output": return "hsl(var(--node-output))";
                                default: return "hsl(var(--muted))";
                            }
                        }}
                        maskColor="hsl(var(--background) / 0.8)"
                    />
                    <Background
                        variant="dots"
                        gap={20}
                        size={1}
                        color="hsl(var(--border))"
                    />
                </ReactFlow>
            </div>
        </div>
    );
});

export default forwardRef((props, ref) => (
    <ReactFlowProvider>
        <EditorCanvas {...props} ref={ref} />
    </ReactFlowProvider>
));
