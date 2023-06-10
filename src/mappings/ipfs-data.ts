import {
  json,
  JSONValue,
  JSONValueKind,
  TypedMap,
  Bytes,
  dataSource,
  log,
  BigInt,
} from "@graphprotocol/graph-ts";
import { HiveDescription, ProposalRequestDescription } from "../../generated/schema";

export function handleHiveData(content: Bytes): void {
  const checkJson = json.try_fromBytes(content);
  const jsonObject = checkJson.isOk ? checkJson.value.toObject() : null;

  if (jsonObject === null) {
    log.warning("Error parsing json: {}", [dataSource.stringParam()]);
    return;
  }

  const context = dataSource.context();
  const id = context.getString("id");

  const description = new HiveDescription(id);
  description.offeredServices = getValueAsString(jsonObject, "offeredServices");
  description.manifesto = getValueAsString(jsonObject, "manifesto");

  description.save();
}

export function handleProposalRequestData(content: Bytes): void {
  const checkJson = json.try_fromBytes(content);
  const jsonObject = checkJson.isOk ? checkJson.value.toObject() : null;

  if (jsonObject === null) {
    log.warning("Error parsing json: {}", [dataSource.stringParam()]);
    return;
  }

  const context = dataSource.context();
  const proposalId = context.getBigInt("proposalRequestId");
  const id = context.getString("id");

  let description = new ProposalRequestDescription(id);
  description.proposalRequest = proposalId.toString();

  description.startDate = getValueAsBigInt(jsonObject, "startDate");
  description.about = getValueAsString(jsonObject, "about");
  description.expectedHours = getValueAsBigInt(jsonObject, "expectedHours");
  description.video_url = getValueAsString(jsonObject, "video_url");

  description.save();
}

// ==================================== Utility functions ===========================================

function getValueAsString(jsonObject: TypedMap<string, JSONValue>, key: string): string | null {
  const value = jsonObject.get(key);

  if (value == null || value.isNull() || value.kind != JSONValueKind.STRING) {
    return null;
  }

  return value.toString();
}

function getValueAsBigInt(jsonObject: TypedMap<string, JSONValue>, key: string): BigInt | null {
  const value = jsonObject.get(key);

  if (value == null || value.isNull() || value.kind != JSONValueKind.NUMBER) {
    return null;
  }

  return value.toBigInt();
}
