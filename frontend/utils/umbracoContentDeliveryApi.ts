import next from "next";
import { getConfig } from "./configManager";
const config = getConfig();

const addExpand = (url: string, expand: string) => {
  if (expand) {
    return `${url}expand=property:${expand}&`;
  }
  return url;
};
const addFilter = (url, filter) => {
  if (filter) {
    return `${url}filter=contentType:${filter}&`;
  }
  return url;
};

export async function callContentDeliveryAPI(
  url: string,
  preview: boolean = false,
  tags: string[] = []
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Api-Key": config.apiKey,
        Preview: preview.toString(),
      },
      next: {
        tags: tags,
        revalidate: 60 * 60 * 24 * 7, // once per week revalidation
      },
    });

    const items = await response.json();
    return items;
  } catch (e) {
    console.error("Error fetching from content delivery API: ", e);
    return null;
  }
}

export async function fetchItems({
  expand = null,
  filter = null,
  skip = null,
  take = null,
}) {
  let url = `${config.domain}/umbraco/delivery/api/v1/content/?`;
  url = addExpand(url, expand);
  url = addFilter(url, filter);

  // console.log(url);
  return callContentDeliveryAPI(url);
}

export async function fetchItem(pathOrId, expand?, preview?: boolean) {
  let url = `${config.domain}/umbraco/delivery/api/v1/content/item/${pathOrId}`;
  // let url = `${config.api_base}/${pathOrId}`;
  url = addExpand(url, expand);

  // (url, config.apiKey, config.previewEnabled);

  return callContentDeliveryAPI(url, preview);
}

const CHILDREN_OF_ROUTE =
  config.domain + "/umbraco/delivery/api/v1/content?fetch=children:"; //everything after the colon is being indexed

export async function getChildren(parentNode: string, tags: string[] = []) {
  const url = CHILDREN_OF_ROUTE + parentNode + "&take=9999"; // Takes the 9,999 first items.
  return callContentDeliveryAPI(url, false, tags);
}
