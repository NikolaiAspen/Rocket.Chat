import type { ReactElement } from 'react';
import { useEffect } from 'react';

import { useSetupWizardContext } from '../contexts/SetupWizardContext';

// brand: cloud-registreringssteget er fjernet — arbeidsområdet fullføres
// alltid som frittstående (ingen Rocket.Chat Cloud-kobling).
const StandaloneCompletionStep = (): ReactElement | null => {
	const { completeSetupWizard } = useSetupWizardContext();

	useEffect(() => {
		void completeSetupWizard();
	}, [completeSetupWizard]);

	return null;
};

export default StandaloneCompletionStep;
