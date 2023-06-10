import { BigInt } from "@graphprotocol/graph-ts";
import { Hive, ProposalRequest } from "../generated/schema";
import { ZERO, ZERO_ADDRESS } from "./constants";

export function getOrCreateHive(id: BigInt): Hive {
  let hive = Hive.load(id.toString());
  if (!hive) {
    hive = new Hive(id.toString());
    hive.address = ZERO_ADDRESS;
    hive.owner = ZERO;
    hive.honeyFee = 0;
    hive.members = [];
    hive.paymasterAddress = ZERO_ADDRESS;
    hive.save();
  }
  return hive;
}

export function getOrCreateProposalRequest(id: BigInt, hiveId: BigInt): ProposalRequest {
  let proposalRequest = ProposalRequest.load(id.toString());
  if (!proposalRequest) {
    proposalRequest = new ProposalRequest(id.toString());

    proposalRequest.createdAt = ZERO;
    proposalRequest.updatedAt = ZERO;
    proposalRequest.ownerId = ZERO;
    proposalRequest.sharedAmount = ZERO;
    proposalRequest.status = "Pending";
    proposalRequest.members = [];
    proposalRequest.shares = [];
    proposalRequest.serviceId = ZERO;
    proposalRequest.rateToken = "";
    proposalRequest.rateAmount = ZERO;
    proposalRequest.expirationDate = ZERO;
    proposalRequest.hive = getOrCreateHive(hiveId).id;
    proposalRequest.save();
  }
  return proposalRequest;
}
