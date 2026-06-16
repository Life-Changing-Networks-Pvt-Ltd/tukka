import { useEffect, useRef } from "react";

const WEBSITE_ID = "tukkatech";
const WEBSITE_NAME = "Tukka Tech Website";
const STORAGE_PREFIX = "tukkatech_analytics";

const getOrCreateId = (key: string) => {
  if (typeof window === "undefined") return "";
  const storageKey = `${STORAGE_PREFIX}_${key}`;
  const existing = window.sessionStorage.getItem(storageKey);
  if (existing) return existing;
  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(storageKey, value);
  return value;
};

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  const storageKey = `${STORAGE_PREFIX}_session`;
  const existing = window.sessionStorage.getItem(storageKey);
  if (existing) return existing;
  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(storageKey, value);
  return value;
};

const getApiBaseUrl = () =>
  (
    import.meta.env.VITE_PUBLIC_API_URL ||
    "https://api.sellerslogin.com/api"
  ).replace(/\/+$/, "");

const readUtmParams = (searchParams: URLSearchParams) => ({
  utmSource: searchParams.get("utm_source") || "",
  utmMedium: searchParams.get("utm_medium") || "",
  utmCampaign: searchParams.get("utm_campaign") || "",
  utmTerm: searchParams.get("utm_term") || "",
  utmContent: searchParams.get("utm_content") || "",
});

export function WebsiteAnalyticsTracker() {
  const previousPageRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fullUrl = window.location.href;
    const page = `${window.location.pathname}${window.location.search || ""}`;
    const searchParams = new URLSearchParams(window.location.search);

    const payload = {
      visitorId: getOrCreateId("visitor"),
      sessionId: getSessionId(),
      website: WEBSITE_NAME,
      websiteId: WEBSITE_ID,
      page,
      url: fullUrl,
      referrer: document.referrer || "",
      landingPage: window.sessionStorage.getItem(`${STORAGE_PREFIX}_landing`) || page,
      previousPage: previousPageRef.current,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeOnPage: 0,
      scrollPercentage: 0,
      converted: false,
      ...readUtmParams(searchParams),
    };

    if (!window.sessionStorage.getItem(`${STORAGE_PREFIX}_landing`)) {
      window.sessionStorage.setItem(`${STORAGE_PREFIX}_landing`, page);
    }

    const body = JSON.stringify(payload);
    const endpoint = `${getApiBaseUrl()}/website/analytics`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    } else {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => undefined);
    }

    previousPageRef.current = page;
  }, []);

  return null;
}
