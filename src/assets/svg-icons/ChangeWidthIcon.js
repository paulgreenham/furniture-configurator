import {SvgIcon} from "@mui/material";
import React from "react";

export function ChangeWidthIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <defs>
                    <marker id="startarrow" markerWidth="10" markerHeight="7"
                            refX="10" refY="3.5" orient="auto">
                        <polygon points="10 0, 10 7, 0 3.5" fill="#000000" />
                    </marker>
                    <marker id="endarrow" markerWidth="10" markerHeight="7"
                            refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                    </marker>
                </defs>
                <line x1="100" y1="50" x2="250" y2="50" stroke="#000000" stroke-width="8"
                      marker-end="url(#endarrow)" marker-start="url(#startarrow)" />
            </svg>
        </SvgIcon>
    )
}
