const express = require("express");
const { postgraphile } = require("postgraphile");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");

const app = express();

app.use(
    postgraphile(process.env.DATABASE_URL, "public", {
        simpleCollections: "only",
        appendPlugins: [PgSimplifyInflectorPlugin],

        // Optional customisation
        graphileBuildOptions: {
            pgOmitListSuffix: true,
        },
    })
);

app.listen(process.env.PORT || 3000);