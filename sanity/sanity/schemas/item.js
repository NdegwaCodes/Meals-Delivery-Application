export default {
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    { name: "title", title: "Title", type: "string",  validation: (Rule) => Rule.required(), },
    { name: "short_description", title: "Short Description", type: "string",validation: (Rule) => Rule.max(200),},
    { name: "price", title: "Price of the dish in Ksh", type: "number",},
    { name: "image", title: "Image of the Item", type: "image",},
  ],  
};
