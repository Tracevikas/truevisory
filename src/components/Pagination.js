import * as React from 'react';

export function Pagination(props) {

    const PageNo = (idx) => {
        props.setPageNo(idx)
    };

    const DOTS = '...';
    const siblingCount = 2;
    const [dotPages] = React.useState([]);

    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const TotalPageCount = props.array;
    const paginationRange = React.useMemo(() => {
        const totalPageCount = Math.ceil(TotalPageCount);
        const totalPageNumbers = siblingCount + 5;

        dotPages.length = 0;
        for (let dp = 1; dp <= totalPageCount; dp++)
            dotPages.push(dp);

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(props.pageNo - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            props.pageNo + siblingCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
        if (!shouldShowLeftDots && !shouldShowRightDots) {
            let middleRange = range(firstPageIndex, lastPageIndex);
            return [...middleRange]
        }

    }, [TotalPageCount, siblingCount, props.pageNo]);
    let lastPage = paginationRange[paginationRange.length - 1];
    if (paginationRange.length < 2)
        return null;
    return (
        <div>
            {/* eslint-disable jsx-a11y/click-events-have-key-events */
                /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
                <ul style={{ listStyle: 'none', paddingLeft: "0", display: 'flex', gap: '15px', justifyContent: 'center' }} >

                    {props.pageNo + 1 != 1 && <li style={{ cursor: 'pointer', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#797979', color: '#fff', borderRadius: '50px' }} onClick={() => PageNo(props.pageNo - 1)}>{"<"}</li>}
                    {paginationRange && paginationRange.map((_a, idx) => (
                        <li
                            key={idx}
                            onClick={() => PageNo(idx)}
                            style={{ cursor: 'pointer', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50px' }}
                            className={props.pageNo == idx ? "bgblue" : ''}
                        >
                            {idx + 1}
                        </li>
                    ))}
                    {props.pageNo+1 != lastPage && <li style={{ cursor: 'pointer', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#797979', color: '#fff', borderRadius: '50px' }} onClick={() => PageNo(props.pageNo + 1)} >{">"}</li>}
                </ul>
                /* eslint-enable jsx-a11y/click-events-have-key-events */
                /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
        </div>
    )
}

