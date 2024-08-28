export const filterHiddenCells = (data: any, equipped: any) => {
  const filteredData = data.filter((item: { id: string }) => {
    return !Object.values(equipped).some(
      (equippedId) => equippedId === item.id
    );
  });
  return filteredData;
};
