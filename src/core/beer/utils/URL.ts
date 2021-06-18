export function getBeerListURL(params = {}) {
  // cant use url for query generation as is due to the api specs
  const url = new URL('https://api.punkapi.com/v2/beers');
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      url.searchParams.set(key, value.replace(/\s/g, '_'));
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

export function getSingleBeerURL(id: number) {
  return `https://api.punkapi.com/v2/beers/${id}`;
}
