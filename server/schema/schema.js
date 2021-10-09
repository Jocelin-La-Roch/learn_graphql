const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString} = graphql;

const HouseType = new GraphQLObjectType({
    name: "House",
    fields: () => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
});

const CarType = new GraphQLObjectType({
    name: "Car",
    fields: () => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
});