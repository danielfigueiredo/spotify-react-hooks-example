import { Transform } from '../utils/transform';

export type Request<Parameters = void> = (params: Parameters) => Promise<any>;

export type IService<Parameters, ReturnType> = (params: Parameters) => Promise<ReturnType>;

export type ServiceFactory = <Parameters, ReturnType>(
  request: Request<Parameters>,
  transform: Transform<any, ReturnType>,
) => IService<Parameters, ReturnType>;
