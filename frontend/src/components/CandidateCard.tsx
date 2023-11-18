import { Button, Card } from 'react-bootstrap';
import { Candidate } from '../types/candidate';

type Props = Candidate & {
  onVoteClick: () => void;
};

function CandidateCard({ id, imageUrl, name, description, onVoteClick }: Props) {
  return (
    <Card className="candidate h-100 rounded-4 overflow-hidden">
      <div
        className="position-absolute fw-bold fs-1 z-1 text-primary text-center rounded-circle bg-body-tertiary shadow"
        style={{ right: 10, top: 10, width: 60, height: 60, lineHeight: '60px' }}
      >
        {id}
      </div>
      <Card.Img variant="top" src={imageUrl} height={300} className="object-fit-cover" />
      <Card.Body className="">
        <Card.Title className="fw-bold">{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="p-3">
        <Button className="w-100 fw-bold" size="lg" onClick={onVoteClick}>
          Vote
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default CandidateCard;
