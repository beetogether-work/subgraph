import { BigInt } from "@graphprotocol/graph-ts";
import { Hive } from "../generated/schema";
import { ZERO, ZERO_ADDRESS } from "./constants";

export function getOrCreateHive(id: BigInt): Hive {
  let hive = Hive.load(id.toString());
  if (!hive) {
    hive = new Hive(id.toString());
    hive.address = ZERO_ADDRESS;
    hive.owner = ZERO;
    hive.honeyFee = 0;
    hive.members = [];
    hive.save();
  }
  return hive;
}
