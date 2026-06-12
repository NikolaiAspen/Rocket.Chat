import { Box, CardGroup } from '@rocket.chat/fuselage';
import { PageScrollableContent, Page } from '@rocket.chat/ui-client';
import { useAtLeastOnePermission, useSetting, useTranslation, useRole, usePermission } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';

import HomePageHeader from './HomePageHeader';
import AddUsersCard from './cards/AddUsersCard';
import CreateChannelsCard from './cards/CreateChannelsCard';
import CustomContentCard from './cards/CustomContentCard';
import JoinRoomsCard from './cards/JoinRoomsCard';

const CREATE_CHANNEL_PERMISSIONS = ['create-c', 'create-p'];

const DefaultHomePage = (): ReactElement => {
	const t = useTranslation();
	const canAddUsers = usePermission('view-user-administration');
	const isAdmin = useRole('admin');
	const canCreateChannel = useAtLeastOnePermission(CREATE_CHANNEL_PERMISSIONS);
	const workspaceName = useSetting('Site_Name');
	const isCustomContentBodyEmpty = useSetting('Layout_Home_Body', '') === '';
	const isCustomContentVisible = useSetting('Layout_Home_Custom_Block_Visible', false);

	return (
		<Page color='default' background='tint'>
			<HomePageHeader />
			<PageScrollableContent>
				<Box is='h2' fontScale='h1' mb={20}>
					{t('Welcome_to_workspace', { Site_Name: workspaceName || 'Dualog Workspace' })}
				</Box>
				<Box is='h3' fontScale='h3' mb={16}>
					{t('Some_ideas_to_get_you_started')}
				</Box>
				<Box mi='neg-x8'>
					<CardGroup wrap stretch>
						{canAddUsers && <AddUsersCard />}
						{canCreateChannel && <CreateChannelsCard />}
						<JoinRoomsCard />
						{(isAdmin || (isCustomContentVisible && !isCustomContentBodyEmpty)) && <CustomContentCard />}
					</CardGroup>
					{/* brand: fast velkomstblokk — designet bor i koden, ikke i settings-HTML */}
					<Box mbs={24} p={24} borderRadius='x16' bg='surface-light' maxWidth='x720'>
						<Box is='h3' fontScale='h4' mbe={8}>
							Velkommen!
						</Box>
						<Box fontScale='p2' color='hint'>
							Sikker samhandling for europeiske bedrifter. Dataene dine lagres i Europa og deles aldri med tredjeparter.
						</Box>
					</Box>
				</Box>
			</PageScrollableContent>
		</Page>
	);
};

export default DefaultHomePage;
