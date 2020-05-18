export interface QueryParams {
	[key: string]: (string | string[]);
}

/**
 * Available parameters for API endpoint
 */
export enum AvailableProps {
	COUNT = 'count',
	AFTER_ID = 'afterId',
	BEFORE_ID = 'beforeId',
	ID = 'id',
	AFTER_TIME = 'afterTime',
	BEFORE_TIME = 'beforeTime',
	TIME = 'time',
	DIRECTION = 'direction',
}

export interface ApiResetResponse {
	success: boolean;
}
