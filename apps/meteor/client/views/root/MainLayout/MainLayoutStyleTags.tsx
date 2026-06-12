import { PaletteStyleTag } from '@rocket.chat/fuselage';
import { useThemeMode } from '@rocket.chat/ui-client';

import { brandTheme } from '../lib/brandTheme';
import { codeBlock } from '../lib/codeBlockStyles';

export const MainLayoutStyleTags = () => {
	const [, , theme] = useThemeMode();

	return (
		<>
			<PaletteStyleTag theme={theme} selector='.rcx-content--main, .rcx-tile' tagId={`main-palette-${theme}`} />
			{/* brand: sidebar/navbar følger lys palett (ikke tvunget dark) — brand-temaet under overstyrer fargene */}
			<PaletteStyleTag theme={theme} selector='.rcx-sidebar--main, .rcx-sidepanel, .rcx-navbar' tagId='sidebar-palette' />
			{theme === 'dark' && <PaletteStyleTag selector='.rcx-content--main' palette={codeBlock} tagId='codeBlock-palette' />}
			{/* brand: Dualog Workspace-tema bakt inn i klienten */}
			<style id='brand-theme'>{brandTheme}</style>
		</>
	);
};
