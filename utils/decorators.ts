import { test } from '../fixtures';

export function step<TThis, TArgs extends unknown[], TReturn>(
  target: (this: TThis, ...args: TArgs) => Promise<TReturn>,
  context: ClassMethodDecoratorContext<TThis, (this: TThis, ...args: TArgs) => Promise<TReturn>>
) {
  return function replacementMethod(this: TThis, ...args: TArgs): Promise<TReturn> {
    const name = context.name as string;

    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}
