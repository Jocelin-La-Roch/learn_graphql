const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy data
var houses = [
    {name: "jojo house", genre: "1 room", id: "0", userId: "0"},
    {name: "jojo studio", genre: "2 rooms", id: "1", userId: "1"},
    {name: "jojo appart", genre: "3 rooms", id: "2", userId: "2"},
    {name: "jojo hotel", genre: "1 room", id: "3", userId: "0"},
    {name: "jojo penthouse", genre: "2 rooms", id: "4", userId: "1"},
    {name: "jojo case", genre: "3 rooms", id: "5", userId: "2"}
]
var cars = [
    {name: "jojo car", genre: "1 cabine", id: "0"},
    {name: "jojo car", genre: "2 cabines", id: "1"},
    {name: "jojo car", genre: "3 cabines", id: "2"}
]
var users = [
    {name: "jojo 1", age: 1, id: "0"},
    {name: "jojo 2", age: 42, id: "1"},
    {name: "jojo 3", age: 16, id: "2"}
]

const HouseType = new GraphQLObjectType({
    name: "House",
    fields: () => ({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return users[parent.userId] 
            }
        }
    })
});

const CarType = new GraphQLObjectType({
    name: "Car",
    fields: () => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
    })
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        houses: {
            type: new GraphQLList(HouseType),
            resolve(parent, args){
                return houses;
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        house: {
            type: HouseType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db
                return houses[args.id];
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db
                return users[args.id];
            }
        },
        car: {
            type: CarType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db
                return cars[args.id];
            }
        },
        cars: {
            type: new GraphQLList(CarType),
            args: {},
            resolve(parent, args){
                // code to get data from db
                return cars;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args){
                let user = {
                    name: args.name,
                    age: args.age,
                    id: users.length,
                };
                users.push(user);
                console.log('users: ', users);
                return user;
            }
        },
        addHouse: {
            type: HouseType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                userId: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args){
                let book = {
                    name: args.name,
                    genre: args.genre,
                    id: houses.length,
                    userId: args.userId
                };
                houses.push(book);
                console.log('books: ', houses);
                return book;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})