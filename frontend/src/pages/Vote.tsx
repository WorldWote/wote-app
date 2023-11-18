import React, { useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { WORLDCOIN_APP_ID } from '../settings';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../types/candidate';
import useCandidates from '../hooks/useCandidates';
import useVerifyProof from '../hooks/useVerifyProof';
import { useAccount } from 'wagmi';

function Vote() {
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const { data: candidates, refetch } = useCandidates();
  const { verifyProof } = useVerifyProof();
  const { address } = useAccount();

  const onSuccess = async (result: any) => {
    if (!selectedCandidate) return;
    console.log('nullifier_hash', result.nullifier_hash);
    setLoading(true);
    try {
      await verifyProof(result, selectedCandidate);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        if (e.message.includes('Error: InvalidNullifier()')) {
          alert('You have already voted for this candidate');
        } else alert(e.message);
      } else alert(e);
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  return (
    <>
      <IDKitWidget
        app_id={WORLDCOIN_APP_ID} // obtained from the Developer Portal
        action="ioseb-x" // this is your action name from the Developer Portal
        signal={address}
        onSuccess={onSuccess} // callback when the modal is closed
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
                  <CandidateCard
                    {...candidate}
                    disabled={loading}
                    onVoteClick={() => voteClickHandler(candidate)}
                  />
                </Col>
              ))}
            </Row>
          );
        }}
      </IDKitWidget>
      <Modal show={loading} centered>
        <Modal.Body className="text-center">
          <h4>Processing...</h4>
          <p>Please wait while your vote is being processed</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Vote;
