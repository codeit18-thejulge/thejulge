import React, { useEffect, useState } from "react";
import styles from "@/styles/pagination.module.css";
import Pagination from "react-js-pagination";

interface PageProps {
  limit: number;
  count: number;
  hasNext: boolean;
  viewMax?: number;
  pagingMax?: number;
  onPageChange?: (pageNumber: number) => void; // 부모에게 전달하는 콜백
}

const ListPagination = ({ limit, count, hasNext, viewMax = 5, pagingMax = 7, onPageChange }: PageProps) => {
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [isViewItem, setIsViewItem] = useState(1);
  const [isPrevBtn, isSetPrevBtn] = useState(false);
  const [isNextBtn, isSetNextBtn] = useState(false);

  useEffect(() => {
    if (limit < viewMax * pagingMax) {
      if (limit / viewMax > 1) {
        setIsViewItem(limit / viewMax);
        isSetPrevBtn(false);
        isSetNextBtn(false);
      }
    } else {
      setIsViewItem(pagingMax);
      isSetPrevBtn(true);
      isSetNextBtn(true);
    }
  }, [limit, viewMax, pagingMax, isPrevBtn, isNextBtn]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber); // 페이지 전환 시 현재 페이지 업데이트
    onPageChange?.(pageNumber); // 부모에게 페이지 번호 전달
  };

  const disabled = () => {
    if (!isPrevBtn) {
      return styles.hidden;
    }

    if (page === 1) {
      return `${styles.customBtn} ${styles.disabled}`;
    }

    return styles.customBtn;
  };

  const totalRecords = count; // 전체 레코드(항목) 수

  return (
    <Pagination
      onChange={handlePageChange} // 페이지 변경 시 호출될 함수
      activePage={page} // 현재 활성화된 페이지
      itemsCountPerPage={viewMax} // 페이지당 항목 수
      totalItemsCount={totalRecords} // 전체 항목 수
      pageRangeDisplayed={isViewItem} // 페이지 번호 범위에 보여줄 최대 페이지 수
      prevPageText={"‹"}
      nextPageText={"›"}
      innerClass={styles.pagination}
      itemClass={styles.pageItem}
      activeClass={styles.activePage}
      itemClassPrev={disabled()}
      itemClassNext={hasNext && isNextBtn ? styles.customBtn : styles.hidden}
      itemClassFirst={styles.hidden}
      itemClassLast={styles.hidden}
    />
  );
};

export default ListPagination;
