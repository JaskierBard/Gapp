export const sortEquipment = (data:any) => {
    return data.sort((a:any, b:any) => parseInt(a.id) - parseInt(b.id));
  }