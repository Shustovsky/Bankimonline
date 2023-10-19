import {Heading} from "@radix-ui/themes";
import {clsx} from "clsx";

export enum HeadingLevel {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

interface TitleProps {
  className?: string;
  level: HeadingLevel;
  text: string;
}

export const Title = (props: TitleProps) => {
  const levelClasses = {
    h1: "text-3xl tablet:text-5xl",
    h2: "text-3xl",
    h3: "text-1xl",
    h4: "text-xl",
    h5: "text-base",
    h6: "text-xs",
  };

  return (
    <Heading
      as={props.level}
      className={clsx(levelClasses[props.level], props.className)}
    >
      {props.text}
    </Heading>
  );
};
