// import LoginPage from './components/LoginPage';
// import OnboardingScreen from './components/OnboardingScreen';
// import ShortcutCategories from './components/ShortcutCategories';
import TherapyLandingPage from './components/Hero';
import Hero from './components/Hero';
import InsurancePage from './components/Insurance';
import SlotMachine from './components/Lottery';
import OnboardingScreen from './components/OnboardingScreen';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <main>
      <SpeedInsights />
      <InsurancePage />
    </main>
  );
}
