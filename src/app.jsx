import {
  Code,
  Container,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { startTransition, useState } from 'react';
import TimesTable from './times-table';

function App() {
  const [nodes, setNodes] = useState(1000);
  const handleChange = (nodes) => {
    startTransition(() => {
      setNodes(nodes);
    });
  };
  return (
    <Container p={8}>
      <Stack direction="column" spacing={3}>
        <Heading>Million vs React Demo</Heading>
        <Text>
          The following is a random times table generator benchmark (
          <Link href="https://github.com/aidenybai/million-demo" isExternal>
            source <ExternalLinkIcon mx="2px" />
          </Link>
          ). It follows a comparison between React and Million, along with its
          fiber equivalents.
        </Text>
        <Text>
          In order to invoke a re-render, click the "Increment "button below.
          The "Lag" radar indicates blocking time, but does not account for the
          time it takes to update the UI. Notice the time it takes to update the
          UI after you click to get an idea for update time.
        </Text>
        <Text fontStyle="italic" size="sm">
          Caveat to note: Every row contains 100 empty <Code>{'<div />'}</Code>{' '}
          nodes to stimulate diffing in order to measure performance.
        </Text>
        <Text>
          You can adjust the number of rows by using the the number input. Make
          sure to adjust if you can't see any performance difference or your
          screen freezes.
        </Text>
      </Stack>

      <NumberInput
        mt={3}
        maxW={1000}
        min={0}
        mr="2rem"
        value={nodes}
        onChange={handleChange}
      >
        <NumberInputField placeholder="Enter number of rows" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Tabs isLazy={true} variant="soft-rounded" colorScheme="purple" mt={3}>
        <TabList>
          <Tab>React</Tab>
          <Tab>React Fiber</Tab>
          <Tab>⚡ Million</Tab>
          <Tab>Million Fiber</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TimesTable nodes={nodes} mode="react" />
          </TabPanel>
          <TabPanel>
            <TimesTable nodes={nodes} mode="react-fiber" />
          </TabPanel>
          <TabPanel>
            <TimesTable nodes={nodes} mode="million" />
          </TabPanel>
          <TabPanel>
            <TimesTable nodes={nodes} mode="million-fiber" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default App;
