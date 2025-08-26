import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ControlTray from "./components/control-tray/ControlTray";
import RecommendationCard from "./components/recommendation-card/RecommendationCard";
import TAAudioAgent, { RecommendationData } from "ta-agent-sdk";
import "ta-agent-sdk/styles.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [muted, setMuted] = useState(true);

  const agent = useMemo(() => {
    return new TAAudioAgent({
      ...(process.env.REACT_APP_BACKEND_HOST && {
        backendHost: process.env.REACT_APP_BACKEND_HOST,
      }),
    });
  }, []);

  const [recommendations, setRecommendations] = useState<RecommendationData[]>(
    []
  );

  const [events, setEvents] = useState<
    { type: string; payload: any; incoming: any }[]
  >([]);

  useEffect(() => {
    const changePlace = () => {};
    const playVideo = () => {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.play();
      }
    };

    const changeRecommendations = (data: RecommendationData[]) => {
      setRecommendations(data);
    };

    agent.onConnected = (connected) => {
      setConnected(connected);
    };

    agent.onMicStateChange = (muted) => {
      setMuted(muted);
    };

    agent.onEvent("switchRecommendations", changeRecommendations);
    agent.onEvent("changePlace", changePlace);
    agent.onEvent("playVideo", playVideo);
    agent.onAnyEvent = (type, payload, incoming) => {
      setEvents((prevEvents) => [{ type, payload, incoming }, ...prevEvents]);
    };
    return () => {
      agent.offEvent("switchRecommendations", changeRecommendations);
      agent.offEvent("changePlace", changePlace);
      agent.offEvent("playVideo", playVideo);
    };
  }, [agent]);

  return (
    <div className="App h-full">
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="flex flex-col gap-2 p-4 border-r border-neutral-200 w-full lg:w-[25%] shrink-0">
          <h1 className="text-3xl font-bold text-gray-900">TA Agent SDK</h1>
          <p className="text-lg text-gray-700">
            Your personal travel assistant. Ask me anything about your trip!
          </p>
          <div className="mb-4">
            <div className="max-h-64 overflow-y-auto bg-gray-50 p-3 rounded-lg shadow-lg">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Connected:</span>
                  <span
                    className={connected ? "text-green-600" : "text-red-600"}
                  >
                    {connected ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Microphone:</span>
                  <span className={muted ? "text-red-600" : "text-green-600"}>
                    {muted ? "Muted" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Event History
          </h3>
          <div className="h-full overflow-y-auto space-y-2">
            {events.map((event, index) => (
              <details key={index} className="group">
                <summary
                  className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                    event.incoming
                      ? "bg-green-50 border-green-200 hover:bg-green-100"
                      : "bg-red-50 border-red-200 hover:bg-red-100"
                  }`}
                >
                  <span className="font-medium text-sm">{event.type}</span>
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      event.incoming
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {event.incoming ? "Incoming" : "Outgoing"}
                  </span>
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                  <div className="relative">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(event.payload, null, 2)}
                    </pre>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          JSON.stringify(event.payload, null, 2)
                        )
                      }
                      className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </details>
            ))}
            {events.length === 0 && (
              <p className="text-gray-500 text-sm italic">No events yet...</p>
            )}
          </div>
          <div className="mt-4 w-full">
            <a
              href="https://www.npmjs.com/package/ta-agent-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="items-center text-center gap-2 px-4 py-2 bg-red-500 block w-full text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              View NPM Package
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 mx-auto overflow-auto">
          <video
            src="http://d1mdu1cxiv2wrk.cloudfront.net/nyc/video/video2.mp4"
            controls
          ></video>

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recommendations
              </h2>
              <p className="text-gray-600 mb-4">
                Click on any recommendation to get more information
              </p>
              <div className="recommendations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {recommendations.map((recommendation) => (
                  <RecommendationCard
                    agent={agent}
                    key={
                      "location" in recommendation
                        ? `location-${recommendation.location.tripadvisor_id}`
                        : `experience-${recommendation.experience.tripadvisor_id}`
                    }
                    recommendation={recommendation}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ControlTray agent={agent} connected={connected} muted={muted} />
    </div>
  );
}

export default App;
