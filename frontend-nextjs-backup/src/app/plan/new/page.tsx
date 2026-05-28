'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { WizardLayout } from '@/components/wizard/WizardLayout';
import { Step1Occasion } from '@/components/wizard/Step1Occasion';
import { Step2Theme } from '@/components/wizard/Step2Theme';
import { Step3Details } from '@/components/wizard/Step3Details';
import { Step4Venue } from '@/components/wizard/Step4Venue';
import { Step5AddOns } from '@/components/wizard/Step5AddOns';
import { Step6Transport } from '@/components/wizard/Step6Transport';
import { Step7Review } from '@/components/wizard/Step7Review';

export default function NewPlanPage() {
  const { step } = useWizardStore();

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Occasion />;
      case 2: return <Step2Theme />;
      case 3: return <Step3Details />;
      case 4: return <Step4Venue />;
      case 5: return <Step5AddOns />;
      case 6: return <Step6Transport />;
      case 7: return <Step7Review />;
      default: return <Step1Occasion />;
    }
  };

  return (
    <WizardLayout>
      {renderStep()}
    </WizardLayout>
  );
}
