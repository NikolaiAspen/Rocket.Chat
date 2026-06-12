import { useSetting, useAssetWithDarkModePath } from '@rocket.chat/ui-contexts';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

import LoginSwitchLanguageFooter from '../components/LoginSwitchLanguageFooter';
import { RegisterTitle } from '../components/RegisterTitle';

// brand: petrol primærknapper/lenker også på login-flaten (egen DOM-gren,
// MainLayout-temaet gjelder ikke her).
const brandLoginTheme = `
:root:root {
	--rcx-color-button-background-primary-default: #02405a;
	--rcx-color-button-background-primary-hover: #03567a;
	--rcx-color-button-background-primary-press: #022f42;
	--rcx-color-button-background-primary-focus: #02405a;
	--rcx-color-font-info: #02405a;
}
`;

// brand: egen login-layout — sentrert kort på mint-gradient i stedet for
// standard to-kolonne-wizard. Skjemaet (children) gjengis uendret inni kortet.
const styles: Record<string, CSSProperties> = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
		width: '100%',
		padding: '48px 16px',
		boxSizing: 'border-box',
		overflowY: 'auto',
		background: 'linear-gradient(160deg, #d9f0ec 0%, #ecf7f5 45%, #ffffff 100%)',
		color: '#02405a',
	},
	logo: {
		maxHeight: '48px',
		marginBottom: '20px',
	},
	title: {
		marginBottom: '28px',
		textAlign: 'center',
	},
	card: {
		backgroundColor: '#ffffff',
		border: '1px solid #e3edeb',
		borderRadius: '16px',
		boxShadow: '0 12px 40px rgba(2, 64, 90, 0.10)',
		padding: '40px',
		width: '420px',
		maxWidth: '94vw',
		boxSizing: 'border-box',
	},
	footer: {
		marginTop: '28px',
		maxWidth: '420px',
		textAlign: 'center',
	},
};

const HorizontalTemplate = ({ children }: { children: ReactNode }): ReactElement => {
	const hideLogo = useSetting('Layout_Login_Hide_Logo', false);
	const customLogo = useAssetWithDarkModePath('logo');

	return (
		<div style={styles.page}>
			<style>{brandLoginTheme}</style>
			{!hideLogo && customLogo && <img style={styles.logo} src={customLogo} alt='Logo' />}
			<div style={styles.title}>
				<RegisterTitle />
			</div>
			<div style={styles.card}>{children}</div>
			<div style={styles.footer}>
				<div style={{ fontSize: '12px', color: '#5d8596', lineHeight: 1.5 }}>
					Ved å fortsette godtar du <a href='/terms-of-service'>vilkårene for bruk</a> og{' '}
					<a href='/privacy-policy'>personvernreglene</a>. Dataene dine lagres i EU/EØS.
				</div>
				<LoginSwitchLanguageFooter />
			</div>
		</div>
	);
};

export default HorizontalTemplate;
