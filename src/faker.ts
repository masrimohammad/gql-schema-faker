import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import faker from 'faker';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';

// Helper function to generate fake data based on a GraphQL type
const generateFakeData = (type: any): any => {
// Force field existence in case required ex: ID!
  if (type instanceof GraphQLNonNull) {
    return generateFakeData(type.ofType);
  }

  switch (type.constructor.name) {
    case 'GraphQLScalarType': {
      // Handle scalar types using faker.js
      switch (type.name) {
        case 'Int':
          return faker.datatype.number();
        case 'Float':
          return faker.datatype.float();
        case 'AWSTime':
        case 'AWSDate':
        case 'AWSDateTime':
          return faker.date.past().toISOString();
        case 'AWSJSON':
        case 'String': {
          return faker.lorem.sentence();
        }
        case 'AWSEmail':
          return faker.internet.email();
        case 'AWSPhone':
          return faker.phone.phoneNumber();
        case 'Boolean':
          return faker.datatype.boolean();
        case 'ID':
          return faker.datatype.uuid();
        default:
          throw new Error(`Unsupported scalar type: ${type.name}`);
      }
    }
    case 'GraphQLObjectType': {
      // Handle object types by recursively generating fake data for each field
      const fields = (type as GraphQLObjectType).getFields();
      const fakeObject: any = {};
      Object.keys(fields).forEach((fieldName) => {
        fakeObject[fieldName] = generateFakeData(fields[fieldName].type);
      });
      return fakeObject;
    }
    case 'GraphQLList': {
      // Handle list types by generating an array of fake data
      const innerType = (type as GraphQLList<any>).ofType;
      return [generateFakeData(innerType)];
    }
    case 'GraphQLEnumType': {
      // Handle enum types by returning a random enum value
      const values = (type as GraphQLEnumType).getValues();
      const randomIndex = Math.floor(Math.random() * values.length);
      return values[randomIndex].value;
    }
    default:
      throw new Error(`Unsupported GraphQL type: ${type.constructor.name}`);
  }
};

// Define the function that takes in the schema file path and API name
export const generateFakeResponse = (schemaFilePath: string, apiName: string): any => {
  // Read in the schema file and parse it
  const schemaFile = fs.readFileSync(schemaFilePath, 'utf8');
  const schema = makeExecutableSchema({
    typeDefs: schemaFile,
  });

  // Find the API definition in the schema
  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();
  const subscriptionType = schema.getSubscriptionType();

  let apiType;
  if (queryType && queryType.getFields()[apiName]) {
    apiType = queryType.getFields()[apiName].type;
  } else if (mutationType && mutationType.getFields()[apiName]) {
    apiType = mutationType.getFields()[apiName].type;
  } else if (subscriptionType && subscriptionType.getFields()[apiName]) {
    apiType = subscriptionType.getFields()[apiName].type;
  } else {
    throw new Error(`API '${apiName}' not found in schema`);
  }

  // Generate a fake response based on the API type
  return generateFakeData(apiType);
};
