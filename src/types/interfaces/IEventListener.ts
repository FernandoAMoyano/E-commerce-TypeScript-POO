export interface IEventListener<T = any> {
  (data: T): void;
}
