const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/user");
const Favorite = require("./models/favorite");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    favoriteGenre: Favorite
    me: User
  }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
    type Author{
        name: String!
        id: String!
        bookCount:Int
        born: Int
    }

    type Favorite{
        genre: String
    }
    
    type Mutation{
        addAuthor(
            name: String!
            born: Int
        ): Author
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token

        setFavorite(
            genre: String!
        ): Favorite
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args, context) => {
            let returnedBooks = await Book.find({}).populate(
                "author",
                "name born",
            );
            const books = returnedBooks;
            returnedBooks = returnedBooks.map((book) => {
                const author = book.author.toObject();
                const bookCount = books.filter((b) =>
                    b.author.name === author.name
                ).length;

                const authorWithBookCount = { ...author, bookCount };

                return { ...book.toObject(), author: authorWithBookCount };
            });

            if (args.author) {
                returnedBooks = returnedBooks.filter((book) =>
                    book.author.name === args.author
                );
            }
            if (args.genre) {
                returnedBooks = returnedBooks.filter((book) =>
                    book.genres.includes(args.genre)
                );
            }
            return returnedBooks;
        },
        allAuthors: async (root, context) => {
            const authors = await Author.find({});
            const books = await Book.find({}).populate("author", "name born");

            return authors.map((author) => {
                const bookCount = books.filter((book) => {
                    if (!book.author) {
                        return false;
                    }

                    const bookAuthorName = book.author.name;

                    return bookAuthorName === author.name;
                }).length;

                return {
                    name: author.name,
                    born: author.born ?? null,
                    bookCount,
                };
            });
        },
        favoriteGenre: async () => {
            const favGenre = await Favorite.find();
            if (favGenre.length == 0) {
                return { genre: null };
            } else return { genre: favGenre[0].genre };
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Authentication required", {
                    extensions: { code: "UNAUTHORIZED" },
                });
            }
            const authorName = args.author;
            const { title, published, genres } = args;
            let author = await Author.find({ name: authorName });

            if (author.length === 0) {
                author = new Author({
                    name: authorName,
                    born: null,
                });
                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError("Adding book failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.authorName,
                            error,
                        },
                    });
                }
            } else {
                author = author[0];
            }

            const book = new Book({
                title,
                published: parseInt(published),
                author: author,
                genres,
            });

            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError("Adding book failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                        error,
                    },
                });
            }

            // if (!authors.some((author) => author.name === book.author)) {
            //     this.addAuthor(null, { name: book.author });
            // }

            return book;
        },

        setFavorite: async (root, args) => {
            const favGenre = await Favorite.find({});
            const favoriteGenre = favGenre[0];
            if (favGenre.length > 0) {
                favoriteGenre.genre = args.genre;
                await favoriteGenre.save();
                return favoriteGenre;
            }
            const genre = new Favorite({ genre: args.genre });
            await genre.save();
            return genre;
        },

        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Authentication required", {
                    extensions: { code: "UNAUTHORIZED" },
                });
            }
            const foundAuthor = await Author.find({ name: args.name });
            if (!foundAuthor) return null;
            const author = foundAuthor[0];
            author.born = args.setBornTo;
            await author.save();
            return author;
        },

        createUser: async (root, args) => {
            const user = new User({ username: args.username });

            return user.save()
                .catch((error) => {
                    throw new GraphQLError("Creating the user failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.name,
                            error,
                        },
                    });
                });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET,
            );
            const currentUser = await User
                .findById(decodedToken.id);
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
