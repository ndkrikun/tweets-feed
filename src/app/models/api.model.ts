export interface QueryParams {
	[key: string]: (string | string[]);
}

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
