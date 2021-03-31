const { useState, useEffect, useContext } = React;

// Here we are using a shouldFetch flag to conditionally call a function
export default function useFetch(url, method, body, options, shouldFetch, setShouldFetch) {
    const [state, setState] = useState(null);
    useEffect(() => {
        if (shouldFetch === true) {
            if (method === 'get' || method === 'delete') {
                
                axios[method](url, options)
                .then(function (response) {
                  setState({
                      result: response.data,
                      isError: false,
                  });
                  setShouldFetch(false) // avoid infinite calls
                })
                .catch(function (error) {
                  error.response.data.isError = true;
                  setState(error.response.data);
                  setShouldFetch(false) // avoid infinite calls
                });
            } else {
                axios[method](url, body, options)
                .then(function (response) {
                  response.data.isError = false;
                  setState(response.data);
                  setShouldFetch(false) // avoid infinite calls
                })
                .catch(function (error) {
                  error.response.data.isError = true;
                  setState(error.response.data);
                  setShouldFetch(false) // avoid infinite calls
                });
            }

        }
    }, [shouldFetch]);

    return [state]; // You can maybe add fetch status as well
};
