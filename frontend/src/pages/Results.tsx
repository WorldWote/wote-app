import React, { useCallback, useEffect } from 'react';
import useCandidates from '../hooks/useCandidates';
import { Card, Table } from 'react-bootstrap';
import useReceivers from '../hooks/useReceivers';
import { readContracts } from '@wagmi/core';
import { abis } from '../contracts';
import { Candidate } from '../types/candidate';
import VotesChart from '../components/VotesChart';

function Results() {
  const { data: candidates } = useCandidates();
  const { data: receivers } = useReceivers();

  console.log(receivers);

  const getVotes = async (
    chainId: number,
    contractAddress: `0x${string}`,
    candidates: Candidate[],
  ) => {
    const result = await readContracts({
      contracts: candidates?.map((candidate) => ({
        address: contractAddress,
        chainId: chainId,
        abi: abis.wote,
        functionName: 'vote',
        args: [candidate.id],
      })),
    });

    console.log(result);

    return result?.map((r) => Number(r?.result)) || [];
  };

  const getAllVotes = useCallback(async () => {
    const votes = await Promise.all(
      receivers?.map(({ chainId, contractAddress }) =>
        getVotes(chainId, contractAddress, candidates),
      ) || [],
    );
    return votes;
  }, [receivers, candidates]);

  useEffect(() => {
    getAllVotes().then((votes) => {
      console.log(votes);
    });
  }, [getAllVotes]);

  return (
    <>
      <Card className="w-100 mb-4">
        <Card.Body>
          <VotesChart candidates={candidates} />
        </Card.Body>
      </Card>
      {/*<Card className="w-100">*/}
      {/*  <Card.Body>*/}
      {/*    <Table striped bordered hover variant="dark">*/}
      {/*      <thead>*/}
      {/*        <tr>*/}
      {/*          <th></th>*/}
      {/*          <th>OptimismGoerli</th>*/}
      {/*          <th></th>*/}
      {/*        </tr>*/}
      {/*      </thead>*/}
      {/*      <tbody></tbody>*/}
      {/*    </Table>*/}
      {/*  </Card.Body>*/}
      {/*</Card>*/}
    </>
  );
}

export default Results;
