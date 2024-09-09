export type ProjectType = {
	_id: string;
	name: string;
	image: string;
	location: string;
	startDate: string;
	endDate?: string;
	projectOwner: string;
	projectOwnerContact?: string;
	activities: string[];
	gallery: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}