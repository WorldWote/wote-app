import { Button, Stack } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const buttonHeight = '10rem';

function Menu() {
  return (
    <>
      <div className="mb-4 w-100" style={{ maxWidth: '30rem' }}>
        <Stack gap={3} className="w-100">
          <Link to="/vote">
            <Button size="lg" variant="primary" className="w-100" style={{height: buttonHeight}}>
              Vote
            </Button>
          </Link>
        </Stack>
      </div>
    </>
  );
}

export default Menu;
