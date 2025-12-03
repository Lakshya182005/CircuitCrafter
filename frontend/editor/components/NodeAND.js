import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const NodeAND = ({ data, isConnectable }) => {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[100px] text-center">
            <div className="font-bold text-sm text-stone-800">AND</div>
            <Handle
                type="target"
                position={Position.Left}
                id="a"
                style={{ top: '30%', background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="b"
                style={{ top: '70%', background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="out"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default memo(NodeAND);
