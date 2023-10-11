const axios = require('axios');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://192.168.2.126:8000/api/delete_transaction?id=43',
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTE2Nzc3MjZiYzYxMWU2ODdmNTcwZDUwMGJjMGFjNWYyZGFjYjNiYWY0YzM4ZDFiMTU3NGYwNTRkYTM0N2E3NGU1ZWI1Nzg4M2QxNzMxMTciLCJpYXQiOjE2OTY5MjUwNzIuMjc3Mjc4LCJuYmYiOjE2OTY5MjUwNzIuMjc3Mjg0LCJleHAiOjE3Mjg1NDc0NzIuMjY3MjY0LCJzdWIiOiI0NSIsInNjb3BlcyI6W119.O_4URbYYm9DQwhZ-HJSZG63kr9ujHXGNNFQ9TZdU2uFuU7vRw0Wgv7QXu4VxU4JNQ-HDiWwO23KxHcC_vEsjBJScERNWvBoRYnrmqXOz0K7mFYHKghSdTHBez9EytJL2NfjhtktpZH4aNiyYNc-j29p-l7XeotmG-YOSUxc1x4csXRapXUaBap42zWukaZJSM6UzEzvQ_BYlV5mO7bRikQOLoig02Ftruv9kfeK8PxrgpG_EJ7iAM8FGCieGQdeSdcBNaFi3V_Wa869z51FHBdUN-Gz6qldFeGAkMPs7xVTaexMTbv1dldzRS9rDiaFvcPcEiCdWLrF8KiUh9gTyp1vikXHyXWxZr6QCNdrh9EDHEyNXiBiIICf7_TyqBYgxr1mlk6cDquG5fAiykQ379GjxL2S_F3RzZgfQpazmw_j1F0SpBjGQvDnu74cwUloiOeYF7ttP-n4_Q1WfFWDQjbQs-eTmzyBdIkZrdhDzCZH_l2BaKiuS0PH5g4x8UlNkMIMLQM7gqlTv6QTsPv1Rn5xkU8DIBVmsL2Ftjas30FwPN9DqrpMHwij6WCbn_ZlujMgeeFU2jeoxc9s9J2rxdJo-SVk_Tcdqc5JYufhP7ofPU4Ayj1CAfHozTTne5hdc7YRBAZ6vmYWx2FU-mom2jGAl-XrW61dyj06-yK9H0K0'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
