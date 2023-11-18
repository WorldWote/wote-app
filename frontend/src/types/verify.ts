import { CredentialType } from "@worldcoin/idkit";

export type VerifyResult  = {
  credential_type: CredentialType,
  merkle_root: `0x${string}`,
  proof: `0x${string}`,
  nullifier_hash: `0x${string}`,
}
