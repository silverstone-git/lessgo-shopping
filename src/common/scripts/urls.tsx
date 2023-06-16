export function getBackendLocation() {
  let fetchLocation: string | undefined;
  if(window.location.href.search('localhost') === -1) {
    fetchLocation = process.env.REACT_APP_LOCAL_BACKEND;
  } else {
    fetchLocation = process.env.REACT_APP_CUR_BACKEND;
  }
  return fetchLocation;
}

export function getFrontendLocation() {
  let fetchLocation: string | undefined;
  if(window.location.href.search('localhost') === -1) {
    fetchLocation = process.env.REACT_APP_LOCAL_FRONTEND;
  } else {
    fetchLocation = process.env.REACT_APP_CUR_FRONTEND;
  }
  return fetchLocation;
}