export async function FetchGitHubData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
  
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }