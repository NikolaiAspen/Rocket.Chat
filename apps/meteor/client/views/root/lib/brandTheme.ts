/* brand: Dualog Workspace-tema, bakt inn i klienten (ingen runtime-CSS i settings).
   Kun fargevariabler, scopet til appens egne palett-selektorer. Doble klassenavn /
   :root:root for å vinne over palett-style-taggene uavhengig av injeksjonsrekkefølge. */
export const brandTheme = `
.rcx-navbar.rcx-navbar {
	--rcx-color-surface-tint: transparent;
	--rcx-color-surface-light: transparent;
	--rcx-color-surface-dark: transparent;
	--rcx-color-surface-room: transparent;
	--rcx-color-surface-sidebar: transparent;
	--rcx-color-surface-neutral: #c5e6e0;
	--rcx-color-surface-hover: #c5e6e0;
	--rcx-color-surface-selected: #b3ded6;
	--rcx-color-font-default: #02405a;
	--rcx-color-font-titles-labels: #02405a;
	--rcx-color-font-hint: #5d8596;
	--rcx-color-font-annotation: #5d8596;
	--rcx-color-font-secondary-info: #5d8596;
	--rcx-color-stroke-light: #b3ded6;
	--rcx-color-stroke-extra-light: #c5e6e0;
	--rcx-color-button-background-secondary-default: transparent;
	--rcx-color-button-background-secondary-hover: #c5e6e0;
	--rcx-color-button-background-secondary-press: #b3ded6;
	--rcx-color-button-background-secondary-focus: transparent;
	--rcx-color-button-background-secondary-keyfocus: #c5e6e0;
	--rcx-color-button-font-on-secondary: #02405a;
}

.rcx-sidebar--main.rcx-sidebar--main,
.rcx-sidepanel.rcx-sidepanel {
	--rcx-color-surface-tint: #ffffff;
	--rcx-color-surface-sidebar: #ffffff;
	--rcx-color-surface-light: #ffffff;
	--rcx-color-surface-room: #ffffff;
	--rcx-color-surface-neutral: #ebf0f2;
	--rcx-color-surface-hover: #ebf0f2;
	--rcx-color-surface-selected: #d9f0ec;
	--rcx-color-surface-featured: #ffffff;
	--rcx-color-surface-featured-hover: #ebf0f2;
	--rcx-color-font-default: #02405a;
	--rcx-color-font-titles-labels: #02405a;
	--rcx-color-font-hint: #5d8596;
	--rcx-color-font-annotation: #5d8596;
	--rcx-color-font-secondary-info: #5d8596;
	--rcx-color-stroke-light: #e3edeb;
	--rcx-color-stroke-extra-light: #eef4f3;
}

:root:root {
	--rcx-color-button-background-primary-default: #02405a;
	--rcx-color-button-background-primary-hover: #03567a;
	--rcx-color-button-background-primary-press: #022f42;
	--rcx-color-button-background-primary-focus: #02405a;
	--rcx-color-button-background-primary-keyfocus: #03567a;
	--rcx-color-button-background-primary-disabled: #9ab3bd;
	--rcx-color-font-info: #02405a;
	--rcx-color-stroke-highlight: #02405a;
}
`;
