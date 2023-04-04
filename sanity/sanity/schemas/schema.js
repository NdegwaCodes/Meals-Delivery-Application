//First, we must import schema creator
import createSchema from "part:@sanity/base/schema-creator";
//Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
//We import object and document schemas
import featured from "./featured";
import category from "./category";
import grocery from "./grocery";
import Item from "./item";


//Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: "default",
    // Then proceed to concatenate our our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([grocery, Item, category, featured]),
});