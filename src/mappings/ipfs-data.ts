import {
  json,
  JSONValue,
  JSONValueKind,
  TypedMap,
  Bytes,
  dataSource,
  log,
} from "@graphprotocol/graph-ts";
import { HiveDescription } from "../../generated/schema";

export function handleHiveData(content: Bytes): void {
  log.log(log.Level.INFO, "handleHiveData");

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

  log.log(log.Level.INFO, description.id);

  // if (description.offeredServices !== null) {
  //   log.info("Hive offeredServices", []);
  //   log.info(description.offeredServices, []);
  // }
  // if (description.manifesto !== null) {
  //   log.info("Hive manifesto", []);
  //   log.info(description.manifesto, []);
  // }

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
