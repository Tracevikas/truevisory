import axios from 'axios';
import { setCookie } from 'utils/Cookie';

export const login = (payload) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || '';
    return async (dispatch) => {
        try {
            const response = await axios.post(`https://truevisory-feeder.el.r.appspot.com/api/auth/signin`, payload
            );
            if (response.status === 200) {
                setCookie('token', response.data.token, 1)
                window.location = baseUrl
            }
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            // Dispatch failure action if needed
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};

export default login;