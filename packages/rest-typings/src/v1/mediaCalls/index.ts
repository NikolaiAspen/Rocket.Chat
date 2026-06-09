export type MediaCallsEndpoints = {
	'/v1/media-calls.escalate': {
		POST: (params: { callId: string }) => { url: string };
	};

	'/v1/media-calls.escalation-info': {
		GET: (params: { callId: string }) => { pexipUrl: string; roomId: string };
	};
};
