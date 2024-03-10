export const countPrice35 = (usage: any) => {
    const input = (usage?.prompt_tokens / 1000) * 0.001;
    const output =(usage?.completion_tokens / 1000) * 0.002;
    console.log('\x1b[31m','input: ' + ((input * 100).toFixed(4)) + ' centów','\x1b[0m')
    console.log('\x1b[31m','output: ' + ((output * 100).toFixed(4)) + ' centów','\x1b[0m')
  };