import { hasPermission, hasAtLeastOnePermission, hasAllPermission } from '../../../app/authorization/client';
import { createSidebarItems } from '../../lib/createSidebarItems';

export const {
	registerSidebarItem: registerAdminSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getAdminSidebarItems,
	subscribeToSidebarItems: subscribeToAdminSidebarItems,
} = createSidebarItems([
	{
		href: '/admin/info',
		i18nLabel: 'Workspace',
		icon: 'info-circled',
		permissionGranted: (): boolean => hasPermission('view-statistics'),
	},
	// brand: Subscription (Rocket.Chat Cloud) og Engagement (EE) er fjernet.
	{
		href: '/admin/moderation',
		i18nLabel: 'Moderation',
		icon: 'shield-alt',
		tag: 'Beta',
		permissionGranted: (): boolean => hasPermission('view-moderation-console'),
	},
	{
		href: '/admin/rooms',
		i18nLabel: 'Rooms',
		icon: 'hashtag',
		permissionGranted: (): boolean => hasPermission('view-room-administration'),
	},
	{
		href: '/admin/users',
		i18nLabel: 'Users',
		icon: 'team',
		permissionGranted: (): boolean => hasPermission('view-user-administration'),
	},
	{
		href: '/admin/invites',
		i18nLabel: 'Invites',
		icon: 'user-plus',
		permissionGranted: (): boolean => hasPermission('create-invite-links'),
	},
	{
		href: '/admin/user-status',
		i18nLabel: 'User_Status',
		icon: 'user',
		permissionGranted: (): boolean => hasAtLeastOnePermission(['manage-user-status']),
	},
	{
		href: '/admin/permissions',
		i18nLabel: 'Permissions',
		icon: 'user-lock',
		permissionGranted: (): boolean => hasAtLeastOnePermission(['access-permissions', 'access-setting-permissions']),
	},
	// brand: ABAC (EE), Device Management (EE) og Email Inboxes (alpha/omnichannel) er fjernet.
	{
		href: '/admin/mailer',
		icon: 'mail',
		i18nLabel: 'Mailer',
		permissionGranted: (): boolean => hasAllPermission('access-mailer'),
	},
	{
		href: '/admin/third-party-login',
		i18nLabel: 'Third_party_login',
		icon: 'login',
		permissionGranted: (): boolean => hasAllPermission('manage-oauth-apps'),
	},
	{
		href: '/admin/integrations',
		i18nLabel: 'Integrations',
		icon: 'code',
		permissionGranted: (): boolean =>
			hasAtLeastOnePermission([
				'manage-outgoing-integrations',
				'manage-own-outgoing-integrations',
				'manage-incoming-integrations',
				'manage-own-incoming-integrations',
			]),
	},
	{
		href: '/admin/import',
		i18nLabel: 'Import',
		icon: 'import',
		permissionGranted: (): boolean => hasPermission('run-import'),
	},
	{
		href: '/admin/sounds',
		i18nLabel: 'Sounds',
		icon: 'volume',
		permissionGranted: (): boolean => hasPermission('manage-sounds'),
	},
	{
		href: '/admin/emoji',
		i18nLabel: 'Emoji',
		icon: 'emoji',
		permissionGranted: (): boolean => hasPermission('manage-emoji'),
	},
	{
		href: '/admin/settings',
		i18nLabel: 'Settings',
		icon: 'customize',
		permissionGranted: (): boolean =>
			hasAtLeastOnePermission(['view-privileged-setting', 'edit-privileged-setting', 'manage-selected-settings']),
	},
]);
