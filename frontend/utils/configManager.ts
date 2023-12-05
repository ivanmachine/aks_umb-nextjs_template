export function getConfig() {
  process.env.NODE_TLS_REJECT_UNATHORIZED = "0";

  const apiKey = process.env.UMBRACO_API_KEY || "aksell-umbraco-api-key887$$";
  const domain =
    process.env.UMBRACO_DOMAIN || "https://1176457-www.web.tornado-node.net";
  const api_base =
    process.env.api_base ||
    "https://1176457-www.web.tornado-node.net/umbraco/delivery/api/v1/content/item";
  const previewEnabled = process.env.UMBRACO_PREVIEW_ENABLED;
  return {
    apiKey,
    domain,
    previewEnabled,
    api_base,
  };
}
