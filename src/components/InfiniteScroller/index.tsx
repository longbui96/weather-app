import { HTMLAttributes, useEffect, useRef } from "react";
import Loading from "../Loading";

import "./index.css";

interface IInfiniteScrollerProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  dataSource: T[];
  isLoading: boolean;
  onLoad: () => void;
  children: (item: T, index: number) => React.ReactNode;
}

const InfiniteScroller = <T,>(props: Partial<IInfiniteScrollerProps<T>>) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { dataSource, children, onLoad, isLoading, ...restProps } = props;

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollerRef.current;
      if (!container) return;

      const scrolledToBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      if (scrolledToBottom) {
        onLoad && onLoad();
      }
    };

    const container = scrollerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <div ref={scrollerRef} className="InfiniteScroller" {...restProps}>
      {dataSource?.map((item, index) => children && children(item, index))}
      {(!dataSource || dataSource.length === 0) && !isLoading && (
        <span>No data found or your city not warmer than above</span>
      )}
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default InfiniteScroller;
