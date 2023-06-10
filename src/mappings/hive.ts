import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import {
  DataUriUpdated,
  MemberJoined,
  ProposalRequestCreated,
  ProposalRequestExecuted,
} from "../../generated/templates/Hive/Hive";
import { HiveData, ProposalRequestData } from "../../generated/templates";
import { getOrCreateHive, getOrCreateProposalRequest } from "../getters";
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

  const context = new DataSourceContext();
  context.setString("id", dataId);
  HiveData.createWithContext(dataUri, context);

  hive.description = dataId;
  hive.save();
}

export function handleProposalRequestCreated(event: ProposalRequestCreated): void {
  const proposalRequestId = event.params.id;
  const proposalRequest = getOrCreateProposalRequest(proposalRequestId, event.params.hiveId);

  proposalRequest.hive = getOrCreateHive(event.params.hiveId).id;
  proposalRequest.serviceId = event.params.serviceId;
  proposalRequest.ownerId = event.params.ownerId;
  proposalRequest.rateToken = event.params.rateToken.toHexString();
  proposalRequest.rateAmount = event.params.rateAmount;
  proposalRequest.platformId = event.params.platformId;
  proposalRequest.expirationDate = event.params.expirationDate;
  proposalRequest.createdAt = event.block.timestamp;
  proposalRequest.updatedAt = event.block.timestamp;

  const cid = event.params.dataUri;
  proposalRequest.cid = cid;

  const dataId = cid + "-" + event.block.timestamp.toString();
  proposalRequest.description = dataId;

  const context = new DataSourceContext();
  context.setBigInt("proposalRequestId", proposalRequestId);
  context.setString("id", dataId);
  ProposalRequestData.createWithContext(cid, context);

  proposalRequest.save();
}

export function handleProposalRequestExecuted(event: ProposalRequestExecuted): void {
  const proposalRequestId = event.params.proposalRequestId;
  const proposalRequest = getOrCreateProposalRequest(proposalRequestId, event.params.hiveId);

  proposalRequest.status = "Executed";
  proposalRequest.save();
}

// ==================================== Utility functions ===========================================

function addToArray(arr: BigInt[], value: BigInt): BigInt[] {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
  return arr;
}
