const express = require("express");

const { postgraphile } = require("postgraphile");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');

const https = require('https');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

const options = {
  key: fs.readFileSync('tools/certificates/localhost-key.pem'),
  cert: fs.readFileSync('tools/certificates/localhost.pem')
};

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

https.createServer(options, app).listen(process.env.PORT || 8080);