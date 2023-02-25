import axios from 'axios';
//https://circleci.com/blog/making-http-requests-with-axios/

//api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;


/* useEffect(() => {
  (async () => {
    const { data } = await api.get('/users');

    setUsers(data);
  })();
}, []); */

const gasId = 'AKfycbwoAT-avOvlS818P9WUu2WP5vS8wP7n8hZWQQp0YLvaoBXtgSnPRSKPTMAOCMHqh681HA'

const serialize = async function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const query = async (payload) =>{
  return "?" + await serialize(payload)
}


const base =  axios.create({
  baseURL: `https://script.google.com/macros/s/${gasId}/exec`,
});


function get(table) {
  return new Promise((resolve, reject) => {
    console.log('executando a query...')



    axios.get(`https://script.google.com/macros/s/${gasId}/exec`,{
        params: {
          method: 'list',
          table: table,
        },
      })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        console.log(err)
        return reject(err);
      });
  });
}

export default {get}