import httpService from "../utils/httpService";
import config from "../utils/config.json";

const apiEnd = config.apiUrl + "/items";

function itemUrl(id) {
  return `${apiEnd}/${id}`;
}

export function getItems() {
  return httpService.get(apiEnd);
}

export function getItem(id) {
  console.log(httpService.get(itemUrl(id)));
  return httpService.get(itemUrl(id));
}

export function saveItem(item) {
  if (item._id) {
    const body = { ...item };
    delete body._id;
    return httpService.put(itemUrl(item._id), body);
  }

  return httpService.post(apiEnd, item);
}

export function deleteItem(itemId) {
  return httpService.delete(itemUrl(itemId));
}
