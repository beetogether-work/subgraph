import { HiveCreated } from "../../generated/HiveFactory/HiveFactory";
import { Hive } from "../../generated/templates";
import { getOrCreateHive } from "../getters";

export function handleHiveCreated(event: HiveCreated): void {
  const hiveId = event.params.id;
  const hive = getOrCreateHive(hiveId);

  hive.address = event.params.hiveAddress;
  hive.owner = event.params.ownerId;
  hive.honeyFee = event.params.honeyFee;
  hive.members = [event.params.ownerId];
  hive.paymasterAddress = event.params.paymasterAddress;

  hive.save();

  // Start indexing the hive, giving its address
  Hive.create(event.params.hiveAddress);
}
