import api from "./api";
import { buildInputPayload } from "../utils/units";

const base = "/api/v1/quantities";

export async function convertQuantity(input) {
  const { data } = await api.post(`${base}/convert`, buildInputPayload(input));
  return data;
}

export async function compareQuantities(input) {
  const { data } = await api.post(`${base}/compare`, buildInputPayload(input));
  return data;
}

export async function arithmeticOperation(operation, input) {
  const { data } = await api.post(`${base}/${operation}`, buildInputPayload(input));
  return data;
}
