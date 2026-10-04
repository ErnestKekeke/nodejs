import {ApolloServer} from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// import typeDefs
import { typeDefs } from './schema.js'

// import mock database
import db from './_ds.js'
// create resolvers object
const resolvers = {
    Query: {
        reviews() {
            return db.reviews
        },
        review(_, args){
            return db.reviews.find(review => review.id === args.id)
        },

        games() {
            return db.games
        },
        game(_, args){
            return db.games.find(game => game.id === args.id)
        },

        authors() {
            return db.authors
        },
        author(_, args){
            return db.authors.find(author => author.id === args.id)
        },
    },

    // Must be outside the Query
    Game:{
        reviews(parent){
            return db.reviews.filter(r => r.game_id === parent.id)
        }
    },
    
    Author:{
        reviews(parent){
            return db.reviews.filter(r => r.author_id === parent.id)
        }           
    },

    Review: {
        game(parent){
            return db.games.find(g => g.id === parent.game_id)
        },

        author(parent){
            return db.authors.find(a => a.id === parent.author_id)
        }
    },

    Mutation: {
        deleteGame(_, args){
            db.games = db.games.filter(g => g.id !== args.id)
            return db.games
        },

        addGame(_, args){
            const newId = String( Math.max(...db.games.map(g => Number(g.id))) + 1);
            const game = {
                id: newId,
                title: args.game.title,
                platform: args.game.platform
            };
            db.games.push(game);
            return game;
        },

        updateGame(_, args){
            const getGame = db.games.find(g => g.id === args.id);    
            if(!getGame) {
                return {
                    game: null,
                    message: "No Game with such ID"
                }
            };
            if(args.game.title){
                getGame.title = args.game.title
            }
            if(args.game.platform){
                getGame.platform = args.game.platform
            }
            return {
                game: getGame,
                message: "Game updated successfully"
            }
        }
    }
} 


// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log('server ready at port: \n', url)