//sorted data of countries by cases of covid 19

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

//one liner
//return sortedData.sort(a,b) => (a.case > b.cases ? -1 : 1)
