/**
 * External dependencies
 */
import fetch from 'isomorphic-fetch';

/**
 * API library
 */

/**
 * Makes an async request using Fetch.
 * This function is primarily just a wrapper for handling and turning data into json to be processed
 * @param {string} url - The url to fetch data
 * @param {object} options - Fetch options
 */
const get = async (url: string, options?: any) => {
  const fetchOptions = {
    headers: { 'Content-Encoding': 'gzip' },
  };

  try {
    const request = await fetch(url, {
      ...fetchOptions,
      ...options,
    });

    const json = await request.json();

    if (request.ok) {
      return json;
    } else {
      throw json;
    }
  } catch (error) {
    throw error;
  }

};

const api = {
  get,
};

export { api };
