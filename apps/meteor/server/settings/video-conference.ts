import { settingsRegistry } from '../../app/settings/server';

export const createVConfSettings = () =>
	settingsRegistry.addGroup('Video_Conference', async function () {
		await this.add('VideoConf_Default_Provider', 'jitsi', {
			type: 'lookup',
			lookupEndpoint: 'v1/video-conference.providers',
			public: true,
		});

		// brand: innstillinger for kjerne-Jitsi-leverandøren. Domenet kan peke på
		// selvhostet Jitsi i EU; default bruker den offentlige tjenesten.
		await this.add('VideoConf_Jitsi_Domain', 'meet.jit.si', {
			type: 'string',
			public: true,
		});
		await this.add('VideoConf_Jitsi_Room_Prefix', 'DualogWorkspace', {
			type: 'string',
			public: true,
		});
		await this.add('VideoConf_Jitsi_SSL', true, {
			type: 'boolean',
			public: true,
		});

		await this.add('VideoConf_Mobile_Ringing', false, {
			type: 'boolean',
			public: true,
			enterprise: true,
			modules: ['videoconference-enterprise'],
			invalidValue: false,
			alert: 'VideoConf_Mobile_Ringing_Alert',
		});

		// #ToDo: Those should probably be handled by the apps themselves
		await this.add('Jitsi_Click_To_Join_Count', 0, {
			type: 'int',
			hidden: true,
		});
		await this.add('Jitsi_Start_SlashCommands_Count', 0, {
			type: 'int',
			hidden: true,
		});
	});
