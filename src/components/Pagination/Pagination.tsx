import { Box, Button, Text } from '@chakra-ui/react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalCount,
  siblingCount = 1,
  onNextPage,
  onPrevPage,
  onPageChange,
}: PaginationProps) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  let totalPages: number[] = range(1, currentPage + 2);
  const totalPageNumbers: number = siblingCount + 2;
  if (totalPageNumbers >= totalCount) {
    totalPages = range(1, totalCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 2 + 2 * siblingCount;
    totalPages = range(1, leftItemCount);
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 2 + 2 * siblingCount;
    totalPages = range(totalCount - rightItemCount + 1, totalCount);
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    totalPages = range(leftSiblingIndex, rightSiblingIndex);
  }

  const firstPageIndex = 1;
  const lastPageIndex = totalCount;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-end"
      gap={2}
      my="2rem"
    >
      <Button
        minW="3rem"
        variant="outline"
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        <IoChevronBack />
      </Button>

      {shouldShowLeftDots && (
        <>
          <Button
            minW="3rem"
            variant={firstPageIndex === currentPage ? 'solid' : 'outline'}
            onClick={() => onPageChange(firstPageIndex)}
          >
            {firstPageIndex}
          </Button>
          <Text fontSize="2xl">...</Text>
        </>
      )}

      {totalPages.length > 0 &&
        totalPages.map((page: number) => {
          return (
            <Button
              key={`index-${page}`}
              minW="3rem"
              variant={page === currentPage ? 'solid' : 'outline'}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}

      {shouldShowRightDots && (
        <>
          <Text fontSize="2xl">...</Text>
          <Button
            minW="3rem"
            variant={lastPageIndex === currentPage ? 'solid' : 'outline'}
            onClick={() => onPageChange(lastPageIndex)}
          >
            {lastPageIndex}
          </Button>
        </>
      )}

      <Button
        minW="3rem"
        variant="outline"
        onClick={onNextPage}
        disabled={currentPage === totalCount}
      >
        <IoChevronForward />
      </Button>
    </Box>
  );
};

export default Pagination;
