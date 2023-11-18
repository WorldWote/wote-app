import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { WORLDCOIN_APP_ID } from '../settings';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../types/candidate';
import useCandidates from '../hooks/useCandidates';

function Vote() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const { data: candidates } = useCandidates();

  const handleVerify = (result: any) => {
    console.log('handleVerify', result);
    console.log('selected', selectedCandidate);
  };

  const onSuccess = (result: any) => {
    console.log('onSuccess', result);
    console.log('selected', selectedCandidate);
  };

  return (
    <IDKitWidget
      app_id={WORLDCOIN_APP_ID} // obtained from the Developer Portal
      action="ioseb-x" // this is your action name from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // optional callback when the proof is received
      credential_types={[CredentialType.Orb]} // optional, defaults to ['orb']
    >
      {({ open }) => {
        const voteClickHandler = (candidate: Candidate) => {
          setSelectedCandidate(candidate);
          open();
        };
        return (
          <Row>
            {(candidates as Candidate[]).map((candidate, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                <CandidateCard {...candidate} onVoteClick={() => voteClickHandler(candidate)} />
              </Col>
            ))}
          </Row>
        );
      }}
    </IDKitWidget>
  );
}

export default Vote;
