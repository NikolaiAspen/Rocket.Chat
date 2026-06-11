import type { CSSProperties, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

// brand: panel-topp i sidebaren — tittel, samtalesøk og Alle/Uleste-filter,
// jf. designsystemets samtaleliste (340px-panelet).
const styles: Record<string, CSSProperties> = {
	wrap: { padding: '14px 16px 10px', flexShrink: 0 },
	title: { fontSize: '18px', fontWeight: 700, color: '#02405a', marginBottom: '10px' },
	input: {
		width: '100%',
		boxSizing: 'border-box',
		padding: '8px 12px',
		border: '1px solid #e3e4e5',
		borderRadius: '8px',
		background: '#fbfbfb',
		color: '#02405a',
		font: 'inherit',
		fontSize: '13px',
		marginBottom: '10px',
	},
	pills: { display: 'flex', gap: '8px' },
};

const pillStyle = (active: boolean): CSSProperties => ({
	border: 0,
	cursor: 'pointer',
	font: 'inherit',
	fontSize: '12px',
	fontWeight: 600,
	padding: '4px 12px',
	borderRadius: '999px',
	background: active ? '#d1ddfe' : '#f7f8f8',
	color: active ? '#02405a' : '#5d8596',
});

type BrandPanelHeaderProps = {
	filterText: string;
	onFilterTextChange: (value: string) => void;
	unreadOnly: boolean;
	onUnreadOnlyChange: (value: boolean) => void;
};

const BrandPanelHeader = ({ filterText, onFilterTextChange, unreadOnly, onUnreadOnlyChange }: BrandPanelHeaderProps): ReactElement => {
	const { t } = useTranslation();

	return (
		<div style={styles.wrap}>
			<div style={styles.title}>{t('Messages')}</div>
			<input
				type='search'
				style={styles.input}
				placeholder={t('Search')}
				value={filterText}
				onChange={(e) => onFilterTextChange(e.currentTarget.value)}
			/>
			<div style={styles.pills}>
				<button type='button' style={pillStyle(!unreadOnly)} onClick={() => onUnreadOnlyChange(false)}>
					{t('All')}
				</button>
				<button type='button' style={pillStyle(unreadOnly)} onClick={() => onUnreadOnlyChange(true)}>
					{t('Unread')}
				</button>
			</div>
		</div>
	);
};

export default BrandPanelHeader;
