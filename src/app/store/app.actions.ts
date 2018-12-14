export const createAction = <Type extends string, Meta>(type: Type, meta?: Meta): IAction<Type, Meta> =>
  ({ type, meta });

export const createPayloadAction = <Type extends string, Payload, Meta>(
  type: Type,
  payload: Payload,
  meta?: Meta,
): IPayloadAction<Type, Payload, Meta> => ({
  ...createAction(type, meta),
  payload,
});
