import { Button, ButtonProps } from 'react-bootstrap';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { abis, addresses } from '../contracts';
import candidates from '../data/candidates.json';
import { useState } from 'react';

function RegisterCandidates(props: ButtonProps) {
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      setLoading(true);
      const config = await prepareWriteContract({
        address: addresses.wote,
        abi: abis.wote,
        functionName: 'registerCandidates',
        args: [candidates.map((c) => [c.id, c.name, c.description, c.imageUrl])],
      });
      const { hash } = await writeContract(config);
      await waitForTransaction({ hash });
    } catch (e) {
      alert(e instanceof Error ? e.message : e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={register} {...props}>
        {loading ? 'Registering...' : 'Register Candidates'}
      </Button>
    </div>
  );
}

export default RegisterCandidates;
