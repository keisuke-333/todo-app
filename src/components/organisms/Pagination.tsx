import Image from "next/image"

import { PaginationButton } from "../atoms/PaginationButton"

type Props = {
  currentPage: number
  numPages: number
  itemsPerPage: number
  totalItems: number
  setCurrentPage: (updater: (oldPage: number) => number) => void
}

export const Pagination = ({
  currentPage,
  numPages,
  itemsPerPage,
  totalItems,
  setCurrentPage,
}: Props) => (
  <>
    <div className="mt-2">
      <p>
        {totalItems <= itemsPerPage
          ? `${totalItems} todo`
          : `${currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1} - ${
              currentPage * itemsPerPage > totalItems ? totalItems : currentPage * itemsPerPage
            } of ${totalItems}`}
      </p>
    </div>

    {totalItems > itemsPerPage && (
      <div className="mt-4 flex justify-center gap-2">
        <PaginationButton
          isDisabled={currentPage === 1}
          onClick={() => currentPage > 1 && setCurrentPage((oldPage) => Math.max(oldPage - 1, 1))}
        >
          <Image src="/arrow-left.svg" alt="arrow left" width={24} height={24} />
        </PaginationButton>

        <PaginationButton
          isDisabled={currentPage === numPages}
          onClick={() => setCurrentPage((oldPage) => Math.min(oldPage + 1, numPages))}
        >
          <Image src="/arrow-right.svg" alt="arrow right" width={24} height={24} />
        </PaginationButton>
      </div>
    )}
  </>
)
