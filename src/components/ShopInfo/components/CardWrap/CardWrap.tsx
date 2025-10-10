import { cn } from "@/utils";

interface ArticleProps {
  bgColor: string;
  children: React.ReactNode;
}

const CardWrap = ({ children, bgColor, ...props }: ArticleProps) => {
  return (
    <article
      className={cn(
        "flex flex-col gap-x-31 overflow-hidden rounded-12 bg-white p-24 desktop:h-356 desktop:flex-row",
        bgColor,
      )}
      {...props}
    >
      {children}
    </article>
  );
};

export default CardWrap;
