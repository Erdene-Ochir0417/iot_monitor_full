import axios from 'axios';

class Service {
  // authSignIn = async (name, password) => {
  //     console.log("sing in")
  //     const url = '/login';
  //     return axios.post(url, {email: name, password})
  // }
  // authSignUp = async (lastname, firstname, email, password) => {
  //     console.log("sing up")
  //     // console.log(data.firstname)
  //     // console.log(data.lastname)
  //     const url = '/register';
  //     return axios.post(url, {lastname: lastname, firstname: firstname, email: email, password: password})
  // }
  getAllDevices = async () => {
    const url = '/devices';
    return axios.get(url);
  };

  getDeviceInfo = async (id) => {
    const url = '/devices/';
    return axios.get(url + id);
  };

  getData = async () => {
    const url = '/dashboard';
    return axios.get(url);
  };

  getDevice = async () => {
    const url = '/devices';
    return axios.get(url);
  };

  addDevice = async (props) => {
    const url = '/devices';
    return axios.post(url, props);
  };

  addSensor = async (props) => {
    const url = '/sensors';
    return axios.post(url, props);
  };

  getSensorInfo = async (id) => {
    const url = '/devices/detail/';
    return axios.get(url + id);
  };
}

export default Service;