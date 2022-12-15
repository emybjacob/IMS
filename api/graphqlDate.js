const { GraphQLScalarType, Kind } = require('graphql');

const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.toDateString(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        //return new Date(value);
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.INT) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
            //return new Date(parseInt(ast.value, 10));
        } else if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
            //return new Date(ast.value)
        }
        return null;
    }
})


module.exports = DateScalar;