import { Box } from '@rocket.chat/fuselage';
import { FeaturePreview, FeaturePreviewOff, FeaturePreviewOn } from '@rocket.chat/ui-client';
import type { IRouterPaths } from '@rocket.chat/ui-contexts';
import { useLayout, useSetting, useCurrentRoutePath, useRouter } from '@rocket.chat/ui-contexts';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import AccessibilityShortcut from './AccessibilityShortcut';
import BrandRail from './BrandRail';
import MainContent from './MainContent';
import { MainLayoutStyleTags } from './MainLayoutStyleTags';
import NavBar from '../../../navbar';
import Sidebar from '../../../sidebar';
import NavigationRegion from '../../navigation';
import RoomsNavigationProvider from '../../navigation/providers/RoomsNavigationProvider';

const INVALID_ROOM_NAME_PREFIXES = ['#', '?'] as const;

const LayoutWithSidebar = ({ children }: { children: ReactNode }): ReactElement => {
	const { isEmbedded: embeddedLayout } = useLayout();

	const currentRoutePath = useCurrentRoutePath();
	const router = useRouter();
	const removeSidenav = embeddedLayout && !currentRoutePath?.startsWith('/admin');

	const firstChannelAfterLogin = useSetting<string>('First_Channel_After_Login', '');
	const roomName = (firstChannelAfterLogin.startsWith('#') ? firstChannelAfterLogin.slice(1) : firstChannelAfterLogin).trim();

	const redirected = useRef(false);

	useEffect(() => {
		const needToBeRedirect = currentRoutePath && ['/', '/home'].includes(currentRoutePath);

		if (!needToBeRedirect) {
			return;
		}

		if (!roomName) {
			return;
		}

		if (INVALID_ROOM_NAME_PREFIXES.some((prefix) => roomName.startsWith(prefix))) {
			// Because this will break url routing. Eg: /channel/#roomName and /channel/?roomName which will route to path /channel
			return;
		}

		if (redirected.current) {
			return;
		}
		redirected.current = true;

		router.navigate({ name: `/channel/${roomName}` as keyof IRouterPaths });
	}, [router, currentRoutePath, roomName]);

	// brand: gradient-lerret med transparent rail; sidebar + innhold bor i et
	// avrundet, hevet kort (radius 16, skygge) — jf. designsystemets main-content.
	const canvasStyle = {
		display: 'flex',
		flexDirection: 'column' as const,
		height: '100%',
		minHeight: 0,
		background:
			'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), linear-gradient(to bottom, rgba(0, 160, 155, 0.3), rgba(140, 170, 253, 0.3))',
	};

	const cardStyle = {
		display: 'flex',
		flex: 1,
		minWidth: 0,
		margin: '0 8px 12px 0',
		borderRadius: '16px',
		overflow: 'hidden',
		background: 'var(--rcx-color-surface-light, #ffffff)',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
	};

	return (
		<div style={embeddedLayout ? undefined : canvasStyle}>
			<AccessibilityShortcut />
			{!embeddedLayout && <NavBar />}
			<Box
				id='rocket-chat'
				className={[embeddedLayout ? 'embedded-view' : undefined, 'menu-nav'].filter(Boolean).join(' ')}
			>
				<MainLayoutStyleTags />
				{!embeddedLayout && <BrandRail />}
				<div style={embeddedLayout ? { display: 'contents' } : cardStyle}>
					{!removeSidenav && (
						<FeaturePreview feature='secondarySidebar'>
							<FeaturePreviewOn>
								<RoomsNavigationProvider>
									<NavigationRegion />
								</RoomsNavigationProvider>
							</FeaturePreviewOn>
							<FeaturePreviewOff>
								<Sidebar />
							</FeaturePreviewOff>
						</FeaturePreview>
					)}
					<MainContent>{children}</MainContent>
				</div>
			</Box>
		</div>
	);
};

export default LayoutWithSidebar;
