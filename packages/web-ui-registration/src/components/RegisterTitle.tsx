import { useSetting } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import { Trans } from 'react-i18next';

export const RegisterTitle = (): ReactElement | null => {
	const siteName = useSetting('Site_Name', 'Dualog Workspace');
	const hideTitle = useSetting('Layout_Login_Hide_Title', false);

	if (hideTitle) {
		return null;
	}

	// brand: siteName interpoleres som variabel (ikke som <1>-element), så den
	// oversatte strengen følger Site_Name i stedet for en hardkodet verdi.
	return (
		<span id='welcomeTitle'>
			<Trans i18nKey='registration.component.welcome' values={{ siteName }} />
		</span>
	);
};
