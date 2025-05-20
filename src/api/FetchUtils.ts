export default class FetchUtils {
  static async get(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
  }

  static async post(url: string, data: string): Promise<any> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // 'some-header': 'header',
        "Content-Type": "application/json"
      },
      body: data
    });
    return response.json();
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    // return response.json();
  }
}
