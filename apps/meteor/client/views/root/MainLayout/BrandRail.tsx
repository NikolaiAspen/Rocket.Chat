import { Icon } from '@rocket.chat/fuselage';
import { useRouter, useCurrentRoutePath } from '@rocket.chat/ui-contexts';
import type { CSSProperties, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

// brand: vertikalt navigasjonsfelt (80px) på gradient-lerretet, jf. designsystemet:
// 52x52-lenker, ikon 20px + 12px label, radius 8, blue-300 -> blue-500 aktiv.
const railStyle: CSSProperties = {
	width: '80px',
	flexShrink: 0,
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	paddingTop: '4px',
	paddingBottom: '12px',
	alignItems: 'center',
};

const linkStyle = (active: boolean): CSSProperties => ({
	width: '52px',
	height: '52px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '6px',
	border: 0,
	borderRadius: '8px',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '11px',
	fontWeight: active ? 500 : 400,
	color: active ? '#02405a' : '#5d8596',
	backgroundColor: active ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
});

const BrandRail = (): ReactElement => {
	const router = useRouter();
	const currentPath = useCurrentRoutePath();
	const { t } = useTranslation();

	const items: { icon: 'home' | 'magnifier' | 'user'; label: string; path: string }[] = [
		{ icon: 'home', label: t('Home'), path: '/home' },
		{ icon: 'magnifier', label: t('Directory'), path: '/directory' },
		{ icon: 'user', label: t('Account'), path: '/account' },
	];

	return (
		<nav style={railStyle} aria-label='primary'>
			{items.map(({ icon, label, path }) => (
				<button
					key={path}
					type='button'
					style={linkStyle(Boolean(currentPath?.startsWith(path)))}
					onClick={() => router.navigate(path as Parameters<typeof router.navigate>[0])}
				>
					<Icon name={icon} size='x20' />
					{label}
				</button>
			))}
		</nav>
	);
};

export default BrandRail;
