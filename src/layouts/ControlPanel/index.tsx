import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import MainNavBar from './MainNavBar';
import HomePanel from './panels/HomePanel';
import ProfilePanel from './panels/ProfilePanel';

import { PATH } from '@/common/constants/route';

interface Props {
  className?: string;
}
const ControlPanel = React.forwardRef<HTMLElement, Props>(
  ({ className }, ref) => {
    const { pathname } = useLocation();

    const [currentPanel, setCurrentPanel] = useState(() => {
      const currentPath = pathname.split('/').slice(2).join('/');
      return initPanel(currentPath, true);
    });

    const value = useMemo(() => {
      return {
        currentPanel,
        setCurrentPanel,
      };
    }, [currentPanel, setCurrentPanel]);

    useLayoutEffect(() => {
      if (currentPanel.isFirstRender) {
        setCurrentPanel(prev => ({
          ...prev,
          isFirstRender: false,
        }));
      }
    }, []);

    useLayoutEffect(() => {
      setCurrentPanel(() => {
        const currentPath = pathname.split('/').slice(2).join('/');
        return initPanel(currentPath);
      });
    }, [pathname]);

    return (
      <ControlPanelContext.Provider value={value}>
        <aside ref={ref} className={className}>
          <nav className='h-control-panel-height flex items-center justify-between bg-gradient-to-r from-gradient-start to-gradient-end'>
            <MainNavBar />
          </nav>

          <nav className='flex-1 overflow-hidden relative'>
            <Panels
              activeTab={currentPanel.panel}
              isFirstRender={currentPanel.isFirstRender}
            />
            <SettingsTabs
              activeTab={currentPanel.panel}
              isFirstRender={currentPanel.isFirstRender}
            />
          </nav>
        </aside>
      </ControlPanelContext.Provider>
    );
  },
);

export default ControlPanel;

export enum ControlPanelType {
  Recs = 'recs',
  Settings = 'settings',
  SettingsTest1 = 'settings/test-1',
  SettingsTest2 = 'settings/test-2',
  Profile = 'profile',
}

export const controlPanels: Record<
  ControlPanelType,
  { path: string; prev: ControlPanelType }
> = {
  [ControlPanelType.Recs]: {
    path: PATH.APP.HOME,
    prev: ControlPanelType.Profile,
  },
  [ControlPanelType.Settings]: {
    path: PATH.APP.SETTING.SELF,
    prev: ControlPanelType.Recs,
  },
  [ControlPanelType.Profile]: {
    path: PATH.APP.PROFILE.SELF,
    prev: ControlPanelType.Recs,
  },
  [ControlPanelType.SettingsTest1]: {
    path: PATH.APP.SETTING.TEST_1,
    prev: ControlPanelType.Profile,
  },
  [ControlPanelType.SettingsTest2]: {
    path: PATH.APP.SETTING.TEST_2,
    prev: ControlPanelType.Profile,
  },
};

function initPanel(path: string, isFirstRender: boolean = false) {
  let panel = ControlPanelType.Recs;

  if (Object.values(ControlPanelType).includes(path as ControlPanelType)) {
    panel = path as ControlPanelType;
  }

  let prev = controlPanels[panel].prev;

  return {
    panel,
    prev,
    isFirstRender,
  };
}

interface IControlPanelContext {
  currentPanel: {
    panel: ControlPanelType;
    prev: ControlPanelType;
    isFirstRender: boolean;
  };
  setCurrentPanel: React.Dispatch<
    React.SetStateAction<{
      panel: ControlPanelType;
      prev: ControlPanelType;
      isFirstRender: boolean;
    }>
  >;
}
const ControlPanelContext = React.createContext<IControlPanelContext>({
  currentPanel: initPanel(PATH.APP.HOME, true),
  setCurrentPanel: () => {},
});

export const useControlPanelContext = () => useContext(ControlPanelContext);

interface TabsProps {
  activeTab: ControlPanelType;
  isFirstRender: boolean;
}

function Panels({ activeTab, isFirstRender }: TabsProps) {
  return (
    <>
      <AnimatePresence>
        {activeTab === ControlPanelType.Recs && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ ease: 'linear', duration: 0.3 }}
            className='w-full h-full bg-white absolute z-20'
          >
            <HomePanel />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(activeTab === ControlPanelType.Profile ||
          activeTab === ControlPanelType.Settings) && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{
              ease: 'linear',
              duration: isFirstRender ? 0 : 0.3,
            }}
            className='w-full h-full bg-white absolute z-20'
          >
            <ProfilePanel />
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
        {activeTab === ControlPanelType.SettingsTest1 && (
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
        {activeTab === ControlPanelType.SettingsTest2 && (
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
