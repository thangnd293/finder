import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import MainNavBar from './MainNavBar';

import { PATH } from '@/common/constants/route';

interface Props {
  className?: string;
}
const ControlPanel = ({ className }: Props) => {
  const { pathname } = useLocation();

  const [currentTab, setCurrentTab] = useState(() => {
    const currentPath = pathname.split('/').slice(2).join('/');
    return initTab(currentPath, true);
  });

  const value = useMemo(() => {
    return {
      currentTab,
      setCurrentTab,
    };
  }, [currentTab, setCurrentTab]);

  useLayoutEffect(() => {
    if (currentTab.isFirstRender) {
      setCurrentTab(prev => ({
        ...prev,
        isFirstRender: false,
      }));
    }
  }, []);

  useLayoutEffect(() => {
    setCurrentTab(() => {
      const currentPath = pathname.split('/').slice(2).join('/');
      return initTab(currentPath);
    });
  }, [pathname]);

  return (
    <ControlPanelContext.Provider value={value}>
      <aside className={className}>
        <nav className='h-control-panel-height flex items-center justify-between bg-gradient-to-r from-gradient-start to-gradient-end'>
          <MainNavBar />
        </nav>

        <nav className='flex-1 overflow-hidden relative'>
          <Tabs
            activeTab={currentTab.tab}
            isFirstRender={currentTab.isFirstRender}
          />
          <SettingsTabs
            activeTab={currentTab.tab}
            isFirstRender={currentTab.isFirstRender}
          />
        </nav>
      </aside>
    </ControlPanelContext.Provider>
  );
};

export default ControlPanel;

export enum ControlPanelTab {
  Recs = 'recs',
  Settings = 'settings',
  SettingsTest1 = 'settings/test-1',
  SettingsTest2 = 'settings/test-2',
  Profile = 'profile',
}

export const ControlPanelTabs: Record<
  ControlPanelTab,
  { path: string; prev: ControlPanelTab }
> = {
  [ControlPanelTab.Recs]: {
    path: PATH.APP.HOME,
    prev: ControlPanelTab.Profile,
  },
  [ControlPanelTab.Settings]: {
    path: PATH.APP.SETTING.SELF,
    prev: ControlPanelTab.Recs,
  },
  [ControlPanelTab.Profile]: {
    path: PATH.APP.PROFILE.SELF,
    prev: ControlPanelTab.Recs,
  },
  [ControlPanelTab.SettingsTest1]: {
    path: PATH.APP.SETTING.TEST_1,
    prev: ControlPanelTab.Profile,
  },
  [ControlPanelTab.SettingsTest2]: {
    path: PATH.APP.SETTING.TEST_2,
    prev: ControlPanelTab.Profile,
  },
};

function initTab(path: string, isFirstRender: boolean = false) {
  let tab = ControlPanelTab.Recs;

  if (Object.values(ControlPanelTab).includes(path as ControlPanelTab)) {
    tab = path as ControlPanelTab;
  }

  let prev = ControlPanelTabs[tab].prev;

  return {
    tab,
    prev,
    isFirstRender,
  };
}

interface IControlPanelContext {
  currentTab: {
    tab: ControlPanelTab;
    prev: ControlPanelTab;
    isFirstRender: boolean;
  };
  setCurrentTab: React.Dispatch<
    React.SetStateAction<{
      tab: ControlPanelTab;
      prev: ControlPanelTab;
      isFirstRender: boolean;
    }>
  >;
}
const ControlPanelContext = React.createContext<IControlPanelContext>({
  currentTab: initTab(PATH.APP.HOME, true),
  setCurrentTab: () => {},
});

export const useControlPanelContext = () => useContext(ControlPanelContext);

interface TabsProps {
  activeTab: ControlPanelTab;
  isFirstRender: boolean;
}

function Tabs({ activeTab, isFirstRender }: TabsProps) {
  return (
    <>
      <AnimatePresence>
        {activeTab === ControlPanelTab.Recs && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ ease: 'linear', duration: 0.3 }}
            className='w-full h-full bg-fuchsia-50 absolute z-20'
          >
            Home
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(activeTab === ControlPanelTab.Profile ||
          activeTab === ControlPanelTab.Settings) && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{
              ease: 'linear',
              duration: isFirstRender ? 0 : 0.3,
            }}
            className='w-full h-full bg-blue-50 absolute z-20'
          >
            Profile
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SettingsTabs({ activeTab, isFirstRender }: TabsProps) {
  return (
    <>
      <AnimatePresence>
        {activeTab === ControlPanelTab.SettingsTest1 && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{
              ease: 'linear',
              duration: isFirstRender ? 0 : 0.3,
            }}
            className='w-full h-full bg-gold-50 absolute z-20'
          >
            Setting 1
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeTab === ControlPanelTab.SettingsTest2 && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{
              ease: 'linear',
              duration: isFirstRender ? 0 : 0.3,
            }}
            className='w-full h-full bg-gradient-end absolute z-20'
          >
            Setting 2
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
