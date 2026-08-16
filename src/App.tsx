import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { BootScreen } from './components/boot/BootScreen';
import { Desktop } from './components/desktop/Desktop';
import { MobileApp } from './mobile/MobileApp';
import { useIsDesktop } from './lib/useMediaQuery';
import { useSettings } from './context/Settings';

export default function App() {
  const [booted, setBooted] = useState(false);
  const isDesktop = useIsDesktop();
  const { settings } = useSettings();

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'user'}>
      <AnimatePresence>{!booted && <BootScreen onDone={() => setBooted(true)} />}</AnimatePresence>
      {booted && (isDesktop ? <Desktop /> : <MobileApp />)}
    </MotionConfig>
  );
}
