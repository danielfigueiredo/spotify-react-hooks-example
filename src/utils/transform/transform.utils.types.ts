export type Transform<InputType, ReturnType> = (obj: InputType) => ReturnType;

export interface TransformPipe {
  <A, B>(t1: Transform<A, B>): Transform<A, B>;
  <A, B, C>(t1: Transform<A, B>, t2: Transform<B, C>): Transform<A, C>;
  <A, B, C, D>(t1: Transform<A, B>, t2: Transform<B, C>, t3: Transform<C, D>): Transform<A, D>;
  <A, B, C, D, E>(
    t1: Transform<A, B>,
    t2: Transform<B, C>,
    t3: Transform<C, D>,
    t4: Transform<D, E>,
  ): Transform<A, E>;
  <A, B, C, D, E, F>(
    t1: Transform<A, B>,
    t2: Transform<B, C>,
    t3: Transform<C, D>,
    t4: Transform<D, E>,
    t5: Transform<E, F>,
  ): Transform<A, F>;
}
