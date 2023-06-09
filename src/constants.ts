import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts/index";

export const ONE = BigInt.fromI32(1);
export const TEN = BigInt.fromI32(10);
export const ZERO = BigInt.zero();
export const ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");
export const ZERO_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_BIGDEC = BigDecimal.fromString("0");
