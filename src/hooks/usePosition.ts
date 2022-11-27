import axios from 'axios';
import { useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { toast } from 'react-toastify';

import { apiCaller } from '../service/index';
import { useUserStore } from '../store/user';
import { useNavigate } from './useNavigate';

import { isTokenExpired } from '@/common/utils/isTokenExpired';
import { logColor } from '@/common/utils/logColor';

export const useUpdatePosition = () => {
  const navigate = useNavigate();
  const accessToken = useUserStore(s => s.accessToken);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (!isTokenExpired(accessToken)) {
      return;
    }
    if (!isGeolocationAvailable) {
      toast.error('Your browser does not support Geolocation');
      return;
    }
    if (!isGeolocationEnabled) {
      toast.error('Geolocation is not enabled');
      return;
    }
    if (!coords?.longitude || !coords?.latitude) return;
    try {
      (async () => {
        try {
          const response = await axios.get(
            `https://location-api-mu.vercel.app/query?lat=${coords?.latitude}&lon=${coords?.longitude}`,
          );
          console.log(
            logColor(
              logColor('address:  ').red,
              logColor(response.data.location).red,
            ).bgBlack,
          );
        } catch (error) {}
      })();
      apiCaller
        .updateLocation()
        .$args({ coordinates: [coords?.longitude, coords?.latitude] })
        .$fetch();
      console.log(`update location: `, [coords?.longitude, coords?.latitude]);
    } catch (error) {
      console.error('update location failed: ', error);
    }
  }, [accessToken, coords, isGeolocationAvailable, isGeolocationEnabled]);
};
