export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const Image = (props: ImageProps) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={props.className}
    />
  );
};

