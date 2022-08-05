
const calcPageIndex = (page,rows) => {
    if(page === 1) return page;
    return rows + calcPageIndex(page-1,rows);
}

module.exports = calcPageIndex;