import { useContractRead, useContractReads } from "wagmi";
import { abis, addresses } from '../contracts';
import { Candidate } from '../types/candidate';

function useCandidates() {
  const { data } = useContractRead({
    address: addresses.wote,
    abi: abis.wote,
    functionName: 'getCandidates',
    args: [],
  });

  console.log(data);

  const {data: votes} = useContractReads({
    contracts: data?.map((candidate: any) => ({
      address: addresses.wote,
      abi: abis.wote,
      functionName: 'votes',
      args: [candidate.id],
    }))
  });

  console.log(votes);

  const candidates: Candidate[] = data
    ? data.map((candidate: any, index) => ({
        ...candidate,
        id: Number(candidate.id),
        voteCount: Number(votes?.[index]?.result ?? 0),
      }))
    : [];

  return { data: candidates };
}

export default useCandidates;
