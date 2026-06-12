import type { ReactElement } from 'react';

import { useSetupWizardContext } from './contexts/SetupWizardContext';
import AdminInfoStep from './steps/AdminInfoStep';
import OrganizationInfoStep from './steps/OrganizationInfoStep';
import StandaloneCompletionStep from './steps/StandaloneCompletionStep';

const SetupWizardPage = (): ReactElement => {
	const { currentStep } = useSetupWizardContext();

	switch (currentStep) {
		case 1:
			return <AdminInfoStep />;
		case 2:
			return <OrganizationInfoStep />;
		// brand: steg 3 (cloud-registrering) og 4 (cloud-bekreftelse) er fjernet —
		// fullfører alltid frittstående.
		case 3:
		case 4:
			return <StandaloneCompletionStep />;

		default:
			throw new Error('Wrong wizard step');
	}
};

export default SetupWizardPage;
