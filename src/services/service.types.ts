import { Transform } from '../utils/transform';

export type Request<Parameters> = (params: Parameters) => Promise<any>;

export type Service<Parameters, ReturnType> = (params: Parameters) => Promise<ReturnType>;

export type ServiceFactory = <Parameters, ReturnType>(
  request: Request<Parameters>,
  transform: Transform<any, ReturnType>,
) => Service<Parameters, ReturnType>;
