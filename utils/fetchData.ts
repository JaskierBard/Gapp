export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`http://192.168.0.108:3001/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    return res;
    // return JSON.stringify(res);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const transactionData = async (
  itemId: string,
  itemType: string,
  userId: string,
  seller: string,
  price: number,
  transactionType?: string,
) => {
  try {
    const response = await fetch(
      `http://192.168.0.108:3001/player/transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          itemType: itemType,
          userId: userId,
          seller: seller,
          price: price,
          transactionType: transactionType,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
