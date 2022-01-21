export const createValidationSchema = (
  schema: object,
  required: string[] = [],
) => {
  function reduceSchemaKey(object, [key, value]) {
    const validation = required.includes(key) ? value.required() : value;

    return {
      ...object,
      [key]: validation,
    };
  }

  return Object.entries(schema).reduce(reduceSchemaKey, {});
};
