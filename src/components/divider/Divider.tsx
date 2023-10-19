import {clsx} from "clsx";

export enum DividerSize {
  'full' = 'full',
  'container' = 'container'
}

interface DividerProps {
  size: DividerSize;
}

export const Divider = (props: DividerProps) => {
  return <div className="w-full relative">
    <div className={clsx(
      'border-solid border-[#333535] h-px border-t border-b-0 border-x-0',
      { ['w-[200vw] absolute transform -translate-x-[50%]']: props.size === DividerSize.full }
    )}>
    </div>
  </div>
};
