type AdviceSlipType = {
  slip: {id: number; advice: string;};
};

const fetchAdviceAndLog = (id: number): void => {
  fetch(`https://api.adviceslip.com/advice/${id}`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Fetching did not work");
      }
      return response.json();
    })
    .then((data: AdviceSlipType) => {
      const advice = data.slip.advice;
      console.log(`Advice ID ${id}: ${advice}`);
    })
    .catch((error: unknown) => {
      console.log(`Error fetching advice for ID ${id}:`, error);
    });
};
