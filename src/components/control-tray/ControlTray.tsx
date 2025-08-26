import cn from "classnames";
import { memo } from "react";
import { TAAudioAgent } from "ta-agent-sdk";
import "./control-tray.scss";
import AudioPulse from "../audio-pulse/AudioPulse";

interface ControlTrayProps {
  agent: TAAudioAgent;
  connected: boolean;
  muted: boolean;
}

const ControlTray: React.FC<ControlTrayProps> = ({
  agent,
  connected,
  muted,
}) => {
  return (
    <div className="control-tray">
      <div id="pulse" className={cn("action-button no-action", { connected })}>
        <span className="helper">Resume</span>
        <AudioPulse />
      </div>
      <div className={cn("connection-container", { connected })}>
        <button
          className={cn("action-button", { connected })}
          onClick={() => agent.destroy()}
        >
          <img
            src="http://d1mdu1cxiv2wrk.cloudfront.net/nyc/images/wave-sound@2x.png"
            alt="restart"
          />
        </button>
        <button
          className={cn("action-button connect-toggle mic-button", {
            connected,
            muted,
          })}
          id="startAudioButton"
          onClick={() => agent.toggleMic()}
        >
          <img
            src="http://d1mdu1cxiv2wrk.cloudfront.net/nyc/images/mic2.svg"
            alt="mic"
          />
        </button>
      </div>
    </div>
  );
};

export default memo(ControlTray);
