import type {ReactElement} from "react";
import {Tooltip} from "@mui/material";

export type IconTooltipProps = {
  tooltip: string;
  icon: ReactElement;
};

function IconTooltip({tooltip, icon}: IconTooltipProps){
  return <Tooltip title={tooltip} arrow>
    {icon}
  </Tooltip>;
}

export default IconTooltip;