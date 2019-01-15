export async function grabLinks(
  url: string,
  selectors: Array<string>
): Promise<Array<string>> {
  return [];
}

export async function grabPaginationLinks(url: string): Promise<Array<string>> {
  return [];
}

export interface Page {
  url: string;
  data: { [key: string]: any };
}

export interface SearchDataSelectors {
  [key: string]: string
}

export async function search(
  start: string,
  key: string,
  dataSelectors?: SearchDataSelectors
): Promise<Array<Page>> {
  return [];
}
