import React, {createContext, useState} from 'react';

export type sideMenuContextValue = {
  collapsed: boolean;
  setCollapsed(value: boolean): void;
};

export const SideMenuContext = createContext<sideMenuContextValue>({
  collapsed: false,
  setCollapsed: () => {},
});

export const SideMenuProvider: React.FC<{}> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideMenuContext.Provider
      value={{
        collapsed,
        setCollapsed: setCollapsed,
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
};
