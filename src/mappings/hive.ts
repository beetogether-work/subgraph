import { BigInt } from "@graphprotocol/graph-ts";
import { MemberJoined } from "../../generated/templates/Hive/Hive";
import { getOrCreateHive } from "../getters";

export function handleMemberJoined(event: MemberJoined): void {
  const hiveId = event.params.hiveId;
  const hive = getOrCreateHive(hiveId);

  hive.members = addToArray(hive.members, event.params.userId);
  hive.save();
}

function addToArray(arr: BigInt[], value: BigInt): BigInt[] {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
  return arr;
}
