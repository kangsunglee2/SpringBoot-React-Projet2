// 1. Producer
const producer = new Promise((resolve, reject) => {
  // 네트워크 작업, 파일 작업 등으로 시간이 소요됨
  console.log('doing something.....');
  setTimeout(() => {
    // resolve('작업 결과'); 
    reject(new Error('에러 발생'));
  }, 2000);
});

// 2. Consumer
producer 
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  });