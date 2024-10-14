import { Tab, TabsContainer } from './Tabs.styles';

interface TabsProps<Value extends string | number> {
  tabs: { label: string; value: Value }[];
  selectedTab: Value;
  onChange: (tab: Value) => void;
  'data-testid'?: string;
}

export const Tabs = <Val extends string | number>({
  tabs,
  selectedTab,
  onChange,
  'data-testid': testId,
}: TabsProps<Val>) => {
  return (
    <TabsContainer data-testid={`${testId}-tabs`}>
      {tabs.map(tab => (
        <Tab
          key={tab.value}
          onClick={() => onChange(tab.value)}
          isActive={tab.value === selectedTab}
          data-testid={`${testId}-${tab.value}-tab`}
        >
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};
