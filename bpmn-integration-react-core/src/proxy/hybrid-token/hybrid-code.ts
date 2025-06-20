import { store } from '../../utils/internal-store-utils'
import { ApplicationhybridCodeRequestOptions } from '../models'

export const getHybridToken =
  async function getAbpApplicationhybridTokenService(
    options: ApplicationhybridCodeRequestOptions
  ) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    const params = {
      client_id: options?.client_id,
      redirect_uri: options?.redirect_uri,
      response_type: options?.response_type,
      scope: options?.scope,
      state: options?.state,
      nonce: options?.nonce
    }

    return fetch(
      `${localStorage.getItem('REACT_APP_API_URL')}/connect/authorize`,
      {
        method: 'POST',
        body: new URLSearchParams(params).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
      .then((data: any) => {
        store.accessToken = data.access_token
        return data
      })
      .catch((error: any) => {
        throw error
      })
  }
