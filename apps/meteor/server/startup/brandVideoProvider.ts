import { videoConfProviders } from '../lib/videoConfProviders';

// brand: Jitsi-videoleverandør registrert fra kjernen (ikke via apps-engine),
// så huddles virker i ren CE uten privat-app-grense, lisens eller cloud.
// appId-sentinel 'core' signaliserer at URL-en genereres inline i video-conf-tjenesten.
export const BRAND_VIDEO_PROVIDER = 'jitsi';
export const BRAND_VIDEO_PROVIDER_APP_ID = 'core';

videoConfProviders.registerProvider(
	BRAND_VIDEO_PROVIDER,
	{
		mic: true,
		cam: true,
		title: true,
		persistentChat: false,
	},
	BRAND_VIDEO_PROVIDER_APP_ID,
);
