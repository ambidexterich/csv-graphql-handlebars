import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';

type PossibleType = typeof GraphQLBoolean 
	| typeof GraphQLFloat 
	| typeof GraphQLInt
	| typeof GraphQLString;

/**
 * Return the proper GraphQL types from the strings returned from CSV
 * @param {string} input the string to infer it's type
 * @returns 
 */
export default (input: string): PossibleType => {
	
	if (input === parseInt(input).toString()) return GraphQLInt;
	if (input === parseFloat(input).toString()) return GraphQLFloat;
	if (input === 'true' || input === 'false') return GraphQLBoolean;

	return GraphQLString;
};