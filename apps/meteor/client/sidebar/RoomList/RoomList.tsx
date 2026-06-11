import { Box } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { VirtualizedScrollbars } from '@rocket.chat/ui-client';
import { useUserPreference, useUserId } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedVirtuoso } from 'react-virtuoso';

import RoomListCollapser from './RoomListCollapser';
import RoomListRow from './RoomListRow';
import RoomListRowWrapper from './RoomListRowWrapper';
import RoomListWrapper from './RoomListWrapper';
import { useOpenedRoom } from '../../lib/RoomManager';
import { useAvatarTemplate } from '../hooks/useAvatarTemplate';
import { useCollapsedGroups } from '../hooks/useCollapsedGroups';
import { usePreventDefault } from '../hooks/usePreventDefault';
import { useRoomList } from '../hooks/useRoomList';
import { useShortcutOpenMenu } from '../hooks/useShortcutOpenMenu';
import { useTemplateByViewMode } from '../hooks/useTemplateByViewMode';

// brand: valgfritt samtalesøk + uleste-filter fra panel-toppen
type RoomListProps = {
	filterText?: string;
	unreadOnly?: boolean;
};

const RoomList = ({ filterText = '', unreadOnly = false }: RoomListProps) => {
	const { t } = useTranslation();
	const isAnonymous = !useUserId();

	const { collapsedGroups, handleClick, handleKeyDown } = useCollapsedGroups();
	const { groupsCount: allGroupsCount, groupsList, roomList: allRoomList, groupedUnreadInfo } = useRoomList({ collapsedGroups });

	// brand: filtrer rom per gruppe og bygg gruppetellingene på nytt, slik at
	// GroupedVirtuoso-strukturen forblir konsistent.
	const { groupsCount, roomList } = useMemo(() => {
		const query = filterText.trim().toLowerCase();
		if (!query && !unreadOnly) {
			return { groupsCount: allGroupsCount, roomList: allRoomList };
		}
		const counts: number[] = [];
		const rooms: typeof allRoomList = [];
		let offset = 0;
		for (const count of allGroupsCount) {
			const slice = allRoomList.slice(offset, offset + count);
			offset += count;
			const kept = slice.filter((room) => {
				if (!room) {
					return false;
				}
				if (query && !`${room.fname ?? room.name ?? ''}`.toLowerCase().includes(query)) {
					return false;
				}
				if (unreadOnly && !(room.unread > 0 || room.tunread?.length || room.alert)) {
					return false;
				}
				return true;
			});
			counts.push(kept.length);
			rooms.push(...kept);
		}
		return { groupsCount: counts, roomList: rooms };
	}, [allGroupsCount, allRoomList, filterText, unreadOnly]);
	const avatarTemplate = useAvatarTemplate();
	const sideBarItemTemplate = useTemplateByViewMode();
	const { ref } = useResizeObserver<HTMLElement>({ debounceDelay: 100 });
	const openedRoom = useOpenedRoom() ?? '';
	const sidebarViewMode = useUserPreference<'extended' | 'medium' | 'condensed'>('sidebarViewMode') || 'extended';

	const extended = sidebarViewMode === 'extended';
	const itemData = useMemo(
		() => ({
			extended,
			t,
			SidebarItemTemplate: sideBarItemTemplate,
			AvatarTemplate: avatarTemplate,
			openedRoom,
			sidebarViewMode,
			isAnonymous,
		}),
		[avatarTemplate, extended, isAnonymous, openedRoom, sideBarItemTemplate, sidebarViewMode, t],
	);

	usePreventDefault(ref);
	useShortcutOpenMenu(ref);

	return (
		<Box position='relative' overflow='hidden' height='full' ref={ref}>
			<VirtualizedScrollbars>
				<GroupedVirtuoso
					groupCounts={groupsCount}
					groupContent={(index) => (
						<RoomListCollapser
							collapsedGroups={collapsedGroups}
							onClick={() => handleClick(groupsList[index])}
							onKeyDown={(e) => handleKeyDown(e, groupsList[index])}
							groupTitle={groupsList[index]}
							unreadCount={groupedUnreadInfo[index]}
						/>
					)}
					{...(roomList.length > 0 && {
						itemContent: (index) => roomList[index] && <RoomListRow data={itemData} item={roomList[index]} />,
					})}
					components={{ Item: RoomListRowWrapper, List: RoomListWrapper }}
				/>
			</VirtualizedScrollbars>
		</Box>
	);
};

export default RoomList;
