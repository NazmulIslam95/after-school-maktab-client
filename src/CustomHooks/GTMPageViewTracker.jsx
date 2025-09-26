import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GTMPageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname,
    });
  }, [location]);

  return null; // nothing to render
}

export default GTMPageViewTracker;
