const { useState, useCallback, } = React;

export default function useFetchTwo() {
  const [response, setResponse] = useState(null);

  const onApiCall = useCallback((method, url, options, body = {}) => {
    if (method === "get" || method === "delete") {
      axios[method](url, options)
        .then(function(response) {
          setResponse({
            result: response.data,
            isError: false,
          });
        })
        .catch(function(error) {
          error.response.data.isError = true;
          setResponse(error.response.data);
        });
    } else {
      axios[method](url, body, options)
        .then(function(response) {
          response.data.isError = false;
          setResponse(response.data);
        })
        .catch(function(error) {
          error.response.data.isError = true;
          setResponse(error.response.data);
        });
    }
  }, []);

  return [response, onApiCall]; // You can maybe add fetch status as well
}