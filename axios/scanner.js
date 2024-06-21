import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const getCurrentScannerStatus = async (only = null) => {

    const accessToken = await getAccessToken();
    const userId = await getUserId();

    try {
        const res = await axios.get(`${ENDPOINT}/${userId}/current-scanner-status?only=${only}`, {
            headers: {
                'x-access-token': accessToken,
            }
        });

        return {
            status: 'success',
            data: res.data
        }

    } catch (err) {
        return {
            status: 'fail',
            data: err.response?.data?.message || "something went wrong"
        }
    }
}