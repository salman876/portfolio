import { Tab, TabsContainer } from './Tabs.styles';

interface TabsProps<Val extends string> {
  tabs: { label: string; value: Val }[];
  selectedTab: Val;
  onChange: (tab: Val) => void;
}

export const Tabs = <Val extends string>({ tabs, selectedTab, onChange }: TabsProps<Val>) => {
  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab key={tab.value} onClick={() => onChange(tab.value)} isActive={tab.value === selectedTab}>
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};
