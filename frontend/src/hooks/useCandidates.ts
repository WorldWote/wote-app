import { useContractRead } from 'wagmi';
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

  const candidates: Candidate[] = data
    ? data.map((candidate: any) => ({
        ...candidate,
        id: Number(candidate.id),
      }))
    : [];

  return { data: candidates };
}

export default useCandidates;
