import { BigInt, DataSourceContext, log } from "@graphprotocol/graph-ts";
import { DataUriUpdated, MemberJoined } from "../../generated/templates/Hive/Hive";
import { HiveData } from "../../generated/templates";
import { getOrCreateHive } from "../getters";
import { concatenate } from "../utils";

export function handleMemberJoined(event: MemberJoined): void {
  const hive = getOrCreateHive(event.params.hiveId);

  hive.members = addToArray(hive.members, event.params.userId);
  hive.save();
}

export function handleDataUriUpdated(event: DataUriUpdated): void {
  const hive = getOrCreateHive(event.params.hiveId);
  const dataUri = event.params.dataUri;
  const dataId = concatenate(dataUri, event.block.timestamp.toString());

  hive.cid = dataUri;

  log.log(log.Level.INFO, "Here");

  const context = new DataSourceContext();
  context.setString("id", dataId);
  HiveData.createWithContext(dataUri, context);

  log.log(log.Level.INFO, "handleDataUriUpdated");
  log.log(log.Level.INFO, dataId);

  hive.description = dataId;
  hive.save();
}

// ==================================== Utility functions ===========================================

function addToArray(arr: BigInt[], value: BigInt): BigInt[] {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
  return arr;
}
