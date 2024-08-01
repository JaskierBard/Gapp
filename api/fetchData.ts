export const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`http://192.168.0.108:3001/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      return res
      // return JSON.stringify(res);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };