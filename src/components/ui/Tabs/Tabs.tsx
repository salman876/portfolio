import { Tab, TabsContainer } from './Tabs.styles';

interface TabsProps<Value extends string | number> {
  tabs: { label: string; value: Value }[];
  selectedTab: Value;
  onChange: (tab: Value) => void;
}

export const Tabs = <Val extends string | number>({ tabs, selectedTab, onChange }: TabsProps<Val>) => {
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
