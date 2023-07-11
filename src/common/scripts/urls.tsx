export function getBackendLocation() {
  let fetchLocation: string | undefined;
  const window1: any = { ...window };
  if(window.location.href.search('localhost') === -1) {
    fetchLocation = window1.__ENV__.REACT_APP_LOCAL_BACKEND;
  } else {
    fetchLocation = window1.__ENV__.REACT_APP_CUR_BACKEND;
  }
  return fetchLocation;
}

export function getFrontendLocation() {
  let fetchLocation: string | undefined;
  const window1: any = { ...window };
  if(window.location.href.search('localhost') === -1) {
    fetchLocation = window1.__ENV__.REACT_APP_LOCAL_FRONTEND;
  } else {
    fetchLocation = window1.__ENV__.REACT_APP_CUR_FRONTEND;
  }
  return fetchLocation;
}