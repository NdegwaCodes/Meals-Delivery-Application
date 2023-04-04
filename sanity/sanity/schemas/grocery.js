export default {
  name: "name",
  title: "Grocery Shop Name",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string",  validation: (Rule) => Rule.required(), },
    { name: "short_description", title: "Short Description", type: "string",validation: (Rule) => Rule.max(200),},
    { name: "image", title: "Image of the Grocery Shop", type: "image",},
    { name: "lat", title: "Latitude of the Restaurant", type: "number",},
    { name: "long", title: "Longitude of the Restaurant", type: "number", },
    { name: "address", title: "Grocery Shop address", type: "string",  validation: (Rule) => Rule.required(), },
    { name: "body", title: "Enter a Rating from (1-5 Stars)", type: "number",  validation: (Rule) => Rule.required().min(1).max(5).error("Please enter a Value between 1 and 5",), },
    { name: "type", title: "Category", validation: (Rule) => Rule.required(), type: "reference", to: [{ type: "category"}], },
    { name: "dishes", title: "Dishes", type: "array", of: [{ type: "reference", to: [{type: "dish"}]}] },
  ],
};
