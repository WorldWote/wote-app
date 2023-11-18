import { Button, Card } from 'react-bootstrap';
import { Candidate } from "../types/candidate";

type Props = Candidate & {
  onVoteClick: () => void;
};

function CandidateCard({ imageUrl, name, description, onVoteClick }: Props) {
  return (
    <Card className="candidate h-100 rounded-4 overflow-hidden">
      <Card.Img variant="top" src={imageUrl} height={300} className="object-fit-cover" />
      <Card.Body className="">
        <Card.Title className="fw-bold">{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="p-3">
        <Button className="w-100 fw-bold" size="lg" onClick={onVoteClick}>Vote</Button>
      </Card.Footer>
    </Card>
  );
}

export default CandidateCard;
