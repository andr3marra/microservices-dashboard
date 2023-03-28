import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import {Status} from '../data'

interface ServiceNodeProps {
  label?: string
  status: Status
}

const ServiceNode = ({
  data,
  isConnectable,
  targetPosition = Position.Left,
  sourcePosition = Position.Right
}: NodeProps<ServiceNodeProps>) => {
  return (
    < >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
        <div className="content" data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
        {data?.label}
        </div>
        <span className={`status ${data.status}`}></span>
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};

ServiceNode.displayName = "ServiceNode";

export default memo(ServiceNode);
