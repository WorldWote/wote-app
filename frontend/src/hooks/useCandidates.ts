import { useContractRead, useContractReads } from 'wagmi';
import { abis, addresses } from '../contracts';
import { Candidate } from '../types/candidate';

function useCandidates() {
  const { data, refetch: refetchCandidates } = useContractRead({
    address: addresses.wote,
    abi: abis.wote,
    functionName: 'getCandidates',
    args: [],
  });

  console.log(data);

  const { data: votes , refetch: refetchVotes} = useContractReads({
    contracts: data?.map((candidate: any) => ({
      address: addresses.wote,
      abi: abis.wote,
      functionName: 'votes',
      args: [candidate.id],
    })),
  });

  const totalCount = votes?.reduce((acc, vote) => {
     return acc + Number(vote.result as any);
  }, 0);

  const candidates: Candidate[] = data
    ? data.map((candidate: any, index) => ({
        ...candidate,
        id: Number(candidate.id),
        voteCount: Number(votes?.[index]?.result ?? 0),
        votePercentage: totalCount ? Number(votes?.[index]?.result ?? 0) / totalCount * 100 : 0,
      }))
    : [];

  const refetch = async () => {
    await refetchCandidates();
    await refetchVotes();
  }
  return { data: candidates, refetch };
}

export default useCandidates;
