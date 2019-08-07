const express = require("express");
const { postgraphile } = require("postgraphile");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');

const app = express();

app.use(
    postgraphile(process.env.DATABASE_URL, "public", {
        simpleCollections: "only",
        appendPlugins: [PgSimplifyInflectorPlugin, PostGraphileNestedMutations],

        // Optional customisation
        graphileBuildOptions: {
            pgOmitListSuffix: true,
            nestedMutationsSimpleFieldNames: true
        },
    })
);

app.listen(process.env.PORT || 3000);