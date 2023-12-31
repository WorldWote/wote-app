import { Candidate } from '../types/candidate';
import { VerifyResult } from '../types/verify';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { abis, addresses } from '../contracts';
import { decodeAbiParameters } from 'viem';
import { useAccount } from "wagmi";

function useVerifyProof() {
  const {address} = useAccount();
  const verifyProof = async (result: VerifyResult, candidate: Candidate) => {
    const signal = address;
    const [unpackedProof] = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof);

    const args = [signal, result.merkle_root, result.nullifier_hash, unpackedProof, candidate.id ];
    console.log(args)

    const config = await prepareWriteContract({
      address: addresses.wote,
      abi: abis.wote,
      functionName: 'verifyAndExecute',
      args,
    });

    const { hash } = await writeContract(config);
    await waitForTransaction({ hash });
  };

  return { verifyProof };
}

export default useVerifyProof;
