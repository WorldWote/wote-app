import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { WORLDCOIN_APP_ID } from '../settings';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../types/candidate';

const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Giorgi Gakharia',
    description:
      'Giorgi Gakharia (Georgian: გიორგი გახარია; born 19 March 1975) is a Georgian politician who served as the 14th Prime Minister of Georgia from 8 September 2019 until his resignation on 18 February 2021.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Giorgi_Gakharia-18.jpg/290px-Giorgi_Gakharia-18.jpg',
  },
  {
    id: '2',
    name: 'Kakha Kaladze',
    description:
      'Kakhaber "Kakha" Kaladze (Georgian: კახაბერ(კახა) კალაძე, pronounced [kʼaχabeɾ kʼaɫadzɛ]; born 27 February 1978) is a Georgian politician and former footballer who serves as the Mayor of Tbilisi since November 2017. ',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kakha_kaladze.jpg/220px-Kakha_kaladze.jpg',
  },
  {
    id: '3',
    name: 'Irakli Garibashvili',
    description:
      'Irakli Garibashvili (Georgian: ირაკლი ღარიბაშვილი, also transliterated as Gharibashvili; born 28 June 1982[1]) is a Georgian politician and a former business executive who has served as the prime minister of Georgia since 22 February 2021',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/PM_Garibashvili%2C_Munich_Security_Conference%2C_Munich_-_Hotel_Bayerischer_Hof.jpg/220px-PM_Garibashvili%2C_Munich_Security_Conference%2C_Munich_-_Hotel_Bayerischer_Hof.jpg',
  },
];

function Vote() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

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
            {candidates.map((candidate, index) => (
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
