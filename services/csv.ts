interface QueryResponse {
	id: string;
}

export const prepareQuery = (id: string): QueryResponse => ({
	id,
});
