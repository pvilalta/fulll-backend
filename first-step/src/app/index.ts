export interface ActionHandler<T> {
  exec: (action: T) => void;
}

class ActionBus {
  private handlers: { [key: string]: ActionHandler<any> } = {};

  register<T>(actionName: string, handler: ActionHandler<T>): void {
    this.handlers[actionName] = handler;
  }

  dispatch<T extends object>(query: T): any {
    const actionName = query.constructor.name;
    const handler = this.handlers[actionName];

    if (!handler) throw new Error(`No handler registered for action ${actionName}`);
    return handler.exec(query);
  }
}

export const queryBus = new ActionBus();
export const commandBus = new ActionBus();
