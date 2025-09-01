import React from "react";
import "./RecommendationCard.css";
import TAAudioAgent, { RecommendationData } from "ta-agent-sdk";

interface RecommendationCardProps {
  agent: TAAudioAgent;
  recommendation: RecommendationData;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  agent,
  recommendation,
}) => {
  // Type guards and data extraction
  const isLocation = "location" in recommendation;
  const isExperience = "experience" in recommendation;

  const photos = recommendation.photos;
  const mainPhoto = photos ? photos.photos[0] : undefined;

  if (isLocation) {
    const { location, review_sources } = recommendation;
    const primaryName =
      location.names.find((name) => name.primary)?.value ||
      location.names[0]?.value ||
      "";
    const rating = location.traveler_ratings.overall.rating;
    const reviewCount = location.traveler_ratings.overall.count;
    const primaryDescription =
      location.descriptions?.find((desc) => desc.language === "en")?.value ||
      "";
    // const mainUrl = location.urls.tripadvisor.main;

    const ranking = location.rankings ? location.rankings[0] : 0;
    const mainCategory = location.categories
      ? location.categories[0]?.display_name
      : "";

    const formatOpeningHours = () => {
      if (location.opening_hours?.formatted) {
        return location.opening_hours.formatted.join(", ");
      }
      return "Hours not available";
    };

    const handleCardClick = () => {
      agent.sendEvent("changePlace", location.tripadvisor_id);
    };

    return (
      <div
        className="recommendation-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Image */}
        {mainPhoto && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={mainPhoto.StandardSizeURL.url}
              alt={primaryName}
              className="w-full h-full object-cover"
            />
            {location.status?.value === "Open" && (
              <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                Open
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Title and Category */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {primaryName}
            </h3>
            {mainCategory && (
              <p className="text-sm text-gray-600">{mainCategory}</p>
            )}
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-medium">{rating}</span>
              <span className="text-gray-600 ml-1">
                ({reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Ranking */}
          {ranking && (
            <p className="text-sm text-green-600 mb-2">
              {ranking.display_text}
            </p>
          )}

          {/* Description */}
          {primaryDescription && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
              {primaryDescription}
            </p>
          )}

          {/* Reviews Snippets */}
          {review_sources && review_sources.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Recent reviews:</p>
              <div className="space-y-1">
                {review_sources.slice(0, 2).map((review) => (
                  <p key={review.id} className="text-xs text-gray-600 italic">
                    "{review.snippet}"
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Opening Hours */}
          <div className="mb-3">
            <p className="text-xs text-gray-500">Hours:</p>
            <p className="text-xs text-gray-700">{formatOpeningHours()}</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-2">
            {location.phone_numbers && location.phone_numbers.length > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                📞 {location.phone_numbers[0].value}
              </span>
            )}
            {location.neighborhoods && location.neighborhoods.length > 0 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                📍 {location.neighborhoods[0].name}
              </span>
            )}
            {location.recommended_visit_length && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                ⏱ {location.recommended_visit_length}h visit
              </span>
            )}
          </div>
        </div>
      </div>
    );
  } else if (isExperience) {
    const { experience } = recommendation;
    const primaryName = experience.names[0]?.value || "";
    const rating = experience.overall_traveller_ratings.bubble_rating;
    const reviewCount = experience.overall_traveller_ratings.total_review_count;
    const primaryDescription =
      experience.description.find((desc) => desc.language === "en")?.value ||
      "";
    const coordinates = experience.coordinates;

    const handleCardClick = () => {
      agent.sendEvent("changePlace", experience.tripadvisor_id);
    };

    return (
      <div
        className="recommendation-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Image */}
        {(mainPhoto || experience.photo_url) && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={mainPhoto?.StandardSizeURL.url || experience.photo_url}
              alt={primaryName}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
              Experience
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {primaryName}
            </h3>
            <p className="text-sm text-blue-600">Travel Experience</p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-medium">{rating}</span>
              <span className="text-gray-600 ml-1">
                ({reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Description */}
          {primaryDescription && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
              {primaryDescription}
            </p>
          )}

          {/* Location Info */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              📍 {coordinates.latitude.toFixed(4)},{" "}
              {coordinates.longitude.toFixed(4)}
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              🎯 Experience
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RecommendationCard;
