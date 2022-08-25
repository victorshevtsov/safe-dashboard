import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { ChainInfo } from "@gnosis.pm/safe-apps-sdk";
import { CopyToClipboardBtn, ExplorerButton, Identicon, Text, theme } from "@gnosis.pm/safe-react-components";
import { useEffect, useState } from "react";
import styled from "styled-components";
import truncateEthAddress from "truncate-eth-address";

const ListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: .5rem;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${theme.colors.tag};
  }
`
export const OwnersList = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const [chainInfo, setChainInfo] = useState<ChainInfo>();
  const [owners, setOwners] = useState<{ address: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const chainInfo = await sdk.safe.getChainInfo();
      setChainInfo(chainInfo);
    }

    fetchData().catch(console.error);
  }, [])

  useEffect(() => {
    const list = safe.owners.map((owner) => {
      return {
        address: owner
      }
    });

    setOwners(list);
  }, []);

  const getExplorerUrl = (address: string): string => {
    return chainInfo ? chainInfo.blockExplorerUriTemplate.address.replace("{{address}}", address) : "#"
  }

  return <>
    <ul>
      {owners.map((owner) =>
        <ListItem key={owner.address}>
          <Identicon size="md" address={owner.address} />
          <Text size="xl">
            {truncateEthAddress(owner.address)}
          </Text>
          <CopyToClipboardBtn textToCopy={owner.address} />
          <ExplorerButton explorerUrl={() => ({ url: getExplorerUrl(owner.address), alt: "" })} />
        </ListItem>
      )}
    </ul>
  </>
}