export const typeDefs = `#graphql

    type Review {
        id: ID,
        rating: Int!,
        content: String!,
        game: Game!,
        author: Author!
    }

    type Game {
        id: ID,
        title: String!,
        platform: [String!]!,
        reviews: [Review]!
    }

    type Author {
        id: ID,
        name: String!,
        verified: Boolean!,
        reviews: [Review]!
    }

    type Query {
        reviews: [Review],
        review(id: ID): Review,

        games: [Game],
        game(id: ID): Game,

        authors: [Author],
        author(id: ID): Author
    }

    type Mutation {
        deleteGame(id: ID!): [Game]!,

        # addGame(title: String!, platform: [String!]!): Game!
        addGame(game: AddGameInput!): Game!

        # updateGame(id: ID!, title: String, platform: [String!]): GGame | String
        updateGame(id: ID!, game: UpdateGameInput!): UpdateGameResponse
    },

    input AddGameInput{
        title: String!, 
        platform: [String!]!
    },

    input UpdateGameInput {
        title: String,
        platform: [String!]
    },

    type UpdateGameResponse {
        game: Game
        message: String
    }

`

// ID, int, float, bool, string, []
// the ! at the end, means, its required 