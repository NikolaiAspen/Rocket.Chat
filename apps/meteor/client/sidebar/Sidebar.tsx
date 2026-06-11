import { SidebarV2 } from '@rocket.chat/fuselage';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BrandPanelHeader from './BrandPanelHeader';
import SidebarRoomList from './RoomList';
import SidebarFooter from './footer';
import BannerSection from './sections/BannerSection';

const Sidebar = () => {
	const { t } = useTranslation();
	const sidebarViewMode = useUserPreference('sidebarViewMode');
	const sidebarHideAvatar = !useUserPreference('sidebarDisplayAvatar');

	// brand: samtalesøk + Alle/Uleste-filter i panel-toppen
	const [filterText, setFilterText] = useState('');
	const [unreadOnly, setUnreadOnly] = useState(false);

	return (
		<SidebarV2
			aria-label={t('Sidebar')}
			className={['rcx-sidebar--main', `rcx-sidebar rcx-sidebar--${sidebarViewMode}`, sidebarHideAvatar && 'rcx-sidebar--hide-avatar']
				.filter(Boolean)
				.join(' ')}
		>
			<BannerSection />
			<BrandPanelHeader
				filterText={filterText}
				onFilterTextChange={setFilterText}
				unreadOnly={unreadOnly}
				onUnreadOnlyChange={setUnreadOnly}
			/>
			<SidebarRoomList filterText={filterText} unreadOnly={unreadOnly} />
			<SidebarFooter />
		</SidebarV2>
	);
};

export default memo(Sidebar);
