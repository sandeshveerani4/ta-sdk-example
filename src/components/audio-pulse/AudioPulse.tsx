import "./audio-pulse.scss";
import c from "classnames";

const lineCount = 3;

export type AudioPulseProps = {
  hover?: boolean;
};

export default function AudioPulse({ hover }: AudioPulseProps) {
  return (
    <div id="audio-pulse" className={c("audioPulse", { active: true, hover })}>
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            id={"ta-sdk-audioLine-" + i}
            key={i}
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  );
}
