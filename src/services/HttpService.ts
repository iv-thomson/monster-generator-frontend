export namespace Http {
  export const getJson = <T>(endpoint: string): Promise<T> => {
    return fetch(endpoint).then(handleResponse);
  };

  export const postJson = async (
    endpoint: string,
    payload: Object
  ): Promise<void> => {
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  };

  export const deleteRequest = async (endpoint: string): Promise<void> => {
    await fetch(endpoint, {
      method: 'DELETE',
    });
  };

  const handleResponse = (response: Response) => response.json();
}
