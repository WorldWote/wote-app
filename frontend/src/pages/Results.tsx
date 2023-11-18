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
  const [votes, setVotes] = React.useState<number[][]>([]);

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
        functionName: 'votes',
        args: [candidate.id],
      })),
    });

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
      setVotes(votes);
    });
  }, []);

  return (
    <>
      <Card className="w-100 mb-4">
        <Card.Header>Current Votes</Card.Header>
        <Card.Body>
          <VotesChart candidates={candidates} />
        </Card.Body>
      </Card>
      <Card className="w-100">
        <Card.Header>Votes records from different networks</Card.Header>
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Candidate #</th>
                <th>Name</th>
                <th>OptimismGoerli</th>
                <th>Goerli</th>
                <th>ScrollSepolia</th>
              </tr>
            </thead>
            <tbody>
              {candidates?.map((candidate, index) => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.voteCount}</td>
                  <td>{votes?.[0]?.[index]}</td>
                  <td>{votes?.[1]?.[index]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default Results;
