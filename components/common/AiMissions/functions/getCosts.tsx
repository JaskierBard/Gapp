export const countPrice35 = (usage: any) => {
  //"gpt-3.5-turbo-1106"
    const input = (usage?.prompt_tokens / 1000) * 0.001;
    const output =(usage?.completion_tokens / 1000) * 0.002;
    console.log('\x1b[31m','input: ' + ((input * 100).toFixed(4)) + ' centów','\x1b[0m')
    console.log('\x1b[31m','output: ' + ((output * 100).toFixed(4)) + ' centów','\x1b[0m')
  };

  export const countPrice4 = (usage: any) => {
    //"gpt-4-turbo-preview"
    const input = (usage?.prompt_tokens / 1000) * 0.01;
    const output =(usage?.completion_tokens / 1000) * 0.03;
    console.log('\x1b[31m','input: ' + ((input * 100).toFixed(4)) + ' centów','\x1b[0m')
    console.log('\x1b[31m','output: ' + ((output * 100).toFixed(4)) + ' centów','\x1b[0m')
  };