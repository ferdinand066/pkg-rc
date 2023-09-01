
const classJoin = (...str: string[]) => {
  return str.filter((s) => s.length > 0).join(" ");
};

const getErrorValue = (name: string, errors: any) => {
  if (!errors) return;
  const splittedName = name.split(".");
  let currentError = errors;

  for (let e in splittedName) {
    if (currentError[splittedName[e]] === undefined) return false;
    currentError = currentError[splittedName[e]];
  }
  return true;
};

const handleToastError = () => {
  return {
    render({ data }: any) {
      return (<Error>data)!.message;
    },
  };
};

const handleToastSuccess = () => {
  return {
    render({ data }: any) {
      return data;
    },
  };
};


export { getErrorValue, classJoin, handleToastError, handleToastSuccess }