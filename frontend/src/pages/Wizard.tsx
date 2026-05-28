import { useWizardStore } from '@/lib/store/wizard-store';
import { WizardLayout } from '@/components/wizard/WizardLayout';
import { Step1Occasion } from '@/components/wizard/Step1Occasion';
import { Step2Logistics } from '@/components/wizard/Step2Logistics';
import { Step3Theme } from '@/components/wizard/Step3Theme';
import { Step4Venue } from '@/components/wizard/Step4Venue';
import { Step5Menu } from '@/components/wizard/Step5Menu';
import { Step6AddOns } from '@/components/wizard/Step6AddOns';
import { Step7Transport } from '@/components/wizard/Step7Transport';
import { Step8Review } from '@/components/wizard/Step8Review';
import { Step9Vibes } from '@/components/wizard/Step9Vibes';
import { Step10PostParty } from '@/components/wizard/Step10PostParty';
import { Step11Review } from '@/components/wizard/Step11Review';

export default function NewPlanPage() {
  const { step } = useWizardStore();

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Occasion />;
      case 2: return <Step2Logistics />;
      case 3: return <Step3Theme />;
      case 4: return <Step4Venue />;
      case 5: return <Step5Menu />;
      case 6: return <Step6AddOns />;
      case 7: return <Step7Transport />;
      case 8: return <Step9Vibes />;
      case 9: return <Step10PostParty />;
      case 10: return <Step11Review />;
      default: return <Step1Occasion />;
    }
  };

  return (
    <WizardLayout>
      {renderStep()}
    </WizardLayout>
  );
}
