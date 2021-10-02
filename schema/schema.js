const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = graphql;

const _ = require('lodash');

require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  version: '13',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const MealType = new GraphQLObjectType({
  name: 'Meal',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    locale: {
      type: GraphQLString,
      optional: true
    },
    name: {
      type: GraphQLString
    },
    procedure_text: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    coach_owned: {
      type: GraphQLBoolean
    },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    status: {
      type: GraphQLString,
      resolve(parent, args) {
        return 'Welcome to GraphQL'
      }
    },
    meal: {
      type: new GraphQLList(MealType),
      args: {
        id: {
          type: GraphQLID
        },
        locale: {
          type: GraphQLString,
          optional: true
        },
        coach_owned: {
          type: GraphQLBoolean
        }
      },
      async resolve(parent, args) {
        let meals = [];
        let mealsLocale = [];
        const {locale, coach_owned} = args;

        if (locale === 'en-US' || typeof coach_owned !== 'undefined') {
          meals = await knex('meal').select('id', 'name', 'procedure_text', 'coach_owned', 'created_at');
        }
        if (locale !== 'en-US' || typeof coach_owned !== 'undefined') {
          mealsLocale = await knex('meal_i18n').select(
            'id', 'locale', 'name', 'procedure_text', 'coach_owned', 'created_at'
          );
        }
        meals = meals.concat(mealsLocale);

        return _.filter(meals, (meal) => {
          if (!meal.locale) meal.locale = 'en-US';
          if (meal.locale === locale) return true;
          if (meal.coach_owned === coach_owned) return true;
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});