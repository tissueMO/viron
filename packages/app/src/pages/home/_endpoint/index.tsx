import { navigate } from 'gatsby';
import React, { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Endpoint from '$components/endpoint';
import { listState } from '$store/atoms/endpoint';
import { oneState } from '$store/selectors/endpoint';
import {
  AuthType,
  AuthTypeEmailFormData,
  Endpoint as TypeEndpoint,
  EndpointID,
  Token,
} from '$types/index';
import { Document } from '$types/oas';
import { promiseErrorHandler } from '$utils/index';

type Props = {
  id: EndpointID;
};
const _Endpoint: React.FC<Props> = ({ id }) => {
  const [endpoint, setEndpoint] = useRecoilState(oneState({ id }));
  const setEndpoints = useSetRecoilState(listState);

  if (!endpoint) {
    throw new Error('Endpoint not found.');
  }

  const handleConnectButtonClick = useCallback(
    function () {
      const f = async function (): Promise<void> {
        const [response, responseError] = await promiseErrorHandler(
          fetch(endpoint.url, {
            mode: 'cors',
          })
        );
        if (!!responseError) {
          // Network error.
          // TODO: show error.
          return;
        }
        // TODO: 既にログイン済みの場合への対応。

        if (response.ok) {
          // response.ok is true when response.status is 2xx.
          // Fetch suceeded. The OAS document is open to public.
          const document: Document = await response.json();
          setEndpoint({ ...endpoint, document });
          navigate(`/endpoints/${endpoint.id}`);
          return;
        }
        if (!response.ok && response.status === 401) {
          // Fetch succeeded but the OAS document requires authentication.
          // TODO: 認証開始
          const [response, responseError] = await promiseErrorHandler(
            fetch(`${new URL(endpoint.url).origin}/viron_authtype`, {
              mode: 'cors',
            })
          );
          if (!!responseError) {
            // TODO
            return;
          }
          const authTypes: AuthType[] = await response.json();
          setEndpoint(function (currVal) {
            if (!currVal) {
              return currVal;
            }
            return { ...currVal, authTypes };
          });
          return;
        }
      };
      f();
    },
    [endpoint, setEndpoint]
  );

  const handleDeleteButtonClick = function (): void {
    setEndpoints(function (currVal) {
      return currVal.filter(function (_endpoint) {
        return _endpoint.id !== endpoint.id;
      });
    });
  };

  const handleOAuthSignin = function (
    endpoint: TypeEndpoint,
    authType: AuthType
  ) {
    const origin = new URL(endpoint.url).origin;
    const redirectUrl = encodeURIComponent(
      `${new URL(location.href).origin}/oauthredirect/${endpoint.id}`
    );
    const fetchUrl = `${origin}${authType.url}?redirect_url=${redirectUrl}`;
    location.href = fetchUrl;
  };

  const handleEmailSignin = function (
    endpoint: TypeEndpoint,
    authType: AuthType,
    data: AuthTypeEmailFormData
  ) {
    const f = async function (): Promise<void> {
      const [response, responseError] = await promiseErrorHandler(
        fetch(`${new URL(endpoint.url).origin}${authType.url}`, {
          method: authType.method,
          body: JSON.stringify(data),
        })
      );
      if (!!responseError) {
        // TODO
        return;
      }
      if (!response.ok) {
        // TODO
        return;
      }
      const token = response.headers.get('Authorization') as Token;
      setEndpoint({ ...endpoint, token });
    };
    f();
  };

  const handleSignout = function (endpoint: TypeEndpoint, authType: AuthType) {
    console.log(endpoint, authType);
  };

  return (
    <Endpoint
      endpoint={endpoint}
      onConnectButtonClick={handleConnectButtonClick}
      onDeleteButtonClick={handleDeleteButtonClick}
      onOAuthSignin={handleOAuthSignin}
      onEmailSignin={handleEmailSignin}
      onSignout={handleSignout}
    />
  );
};

export default _Endpoint;
