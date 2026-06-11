import { NavBar as NavBarComponent } from '@rocket.chat/fuselage';
import { useLayout } from '@rocket.chat/ui-contexts';

import NavBarControlsSection from './NavBarControls/NavBarControlsSection';
import NavBarNavigation from './NavBarNavigation';

// brand: side-ikonene (Home/Directory/Admin) er flyttet til den vertikale
// railen (BrandRail); topbaren beholder søk og brukerkontroller.
const NavBar = () => {
	const { navbar } = useLayout();

	return (
		<NavBarComponent aria-label='header'>
			<NavBarNavigation />
			{!navbar.searchExpanded && <NavBarControlsSection />}
		</NavBarComponent>
	);
};

export default NavBar;
