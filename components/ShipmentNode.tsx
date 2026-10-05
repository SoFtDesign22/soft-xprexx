import { forwardRef } from "react";

type ShipmentNodeProps = { index: number; x: number; y: number };

const ShipmentNode = forwardRef<SVGGElement, ShipmentNodeProps>(function ShipmentNode({ index, x, y }, ref) {
  return <g ref={ref} data-shipment-node={index} transform={`translate(${x} ${y})`}>
    <g data-node-glyph>
    <circle r="12" fill="#FFFFFF" fillOpacity=".45" />
    <circle r="6" fill={index === 2 ? "#00AFEF" : "#FFE000"} stroke="#FFFFFF" strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </g>
  </g>;
});

export default ShipmentNode;
