import { useContractRead } from "wagmi";
import { abis, addresses } from "../contracts";

function useReceivers() {
  const {data} = useContractRead({
    address: addresses.wote,
    abi: abis.wote,
    functionName: "getReceivers",
    args: [],
  });

  return { data };
}

export default useReceivers;
