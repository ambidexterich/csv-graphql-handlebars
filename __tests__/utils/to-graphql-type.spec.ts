import { describe, expect, it } from 'vitest';
import toGraphQLType from '../../utils/to-graphql-type.ts';
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';

describe('utils#mapGraphQLType', () => {
	it('should infer integer', () => {
		expect(toGraphQLType('3')).toBe(GraphQLInt);
	});

	it('should infer float', () => {
		expect(toGraphQLType('3.12')).toBe(GraphQLFloat);
	});

	it('should infer boolean', () => {
		expect(toGraphQLType('true')).toBe(GraphQLBoolean);
		expect(toGraphQLType('false')).toBe(GraphQLBoolean);
	});

	it('should infer string', () => {
		expect(toGraphQLType('string')).toBe(GraphQLString);
	});

	it('should defaults to string', () => {
		expect(toGraphQLType('{ o: 1 }')).toBe(GraphQLString);
	});
});