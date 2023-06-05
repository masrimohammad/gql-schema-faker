# Graphql Schema Endpoints Faker

The GraphQL Schema Faker CLI tool is designed to facilitate the generation of fake API responses for GraphQL schema endpoints. Please note that this tool serves as a guideline repository and provides a basic understanding of how the process works. It is important to consider that this tool might lack types support and may require custom updates to accommodate specific types present in your own schema.

#### Key Features:
* Generate fake API responses for GraphQL schema endpoints
* Provides insights into the process of generating fake data based on the schema
* Customizable and extensible to support various GraphQL types


### Setup Instructions
* make sure that `npm` is installed on your machine
* run `npm install .` in the cloned repo root directory
* run `npm install -g .` in the cloned repo root directory. (if you face any permission errors, please prepend `sudo` to this command)

### Usage
Below is an example about how to use the parser cli command.

`gql-schema-faker --schema=example/schema.graphql --endpoint=getUser`
* **schema:** path of the graphql schema
* **endpoint:** graphql schema endpoint to fake response data for

You can always call the below command to get a descriptive usage hints.
`gql-schema-faker --help`

### Example
Under `example` directory we managed to add a demo graphql schema for you to test.

### Support
If you are using appsync, make sure that you define all scalar types manually in your gql schema file so that this cli commands works properly
https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html#appsync-defined-scalars

Types resolution is done using https://fakerjs.dev.
