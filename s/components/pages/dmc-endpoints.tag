dmc-endpoints.EndpointsPage
  .EndpointsPage__list
    .EndpointsPage__addCard(click="{ handleEndpointAdd }")
      dmc-icon(type="plus")
    virtual(each="{ item, key in endpoint }")
      dmc-endpoint(key="{ key }" title="{ item.title }"
        thumbnail="{ item.thumbnail }"
        description="{ item.description }"
        tags="{ item.tags }" onentry="{ handleEndpointEntry }"
        onedit="{ handleEndpointEdit }"
        onremove="{ handleEndpointRemove }")

  script.
    import router from '../../core/router';
    import constants from '../../core/constants';
    import '../organisms/dmc-endpoint.tag';
    import '../organisms/dmc-entry.tag';
    import '../organisms/dmc-signin.tag';
    import '../atoms/dmc-icon.tag';

    const store = this.riotx.get();
    this.endpoint = store.getter(constants.GETTER_ENDPOINT_LIST) || {};

    store.change(constants.CHANGE_ENDPOINT, (err, state, store) => {
      this.endpoint = state.endpoint;
      this.update()
    })

    handleEndpointAdd() {
      store.action(constants.ACTION_MODAL_SHOW, 'dmc-entry', {
        onSignIn: () => {
          alert('login success');
        }
      });
    }

    handleEndpointEntry(key) {
      Promise
        .resolve()
        .then(() => store.action(constants.ACTION_CURRENT_UPDATE, key))
        .then(() => store.action(constants.ACTION_AUTH_UPDATE, key))
        .then(() => {
          if (!store.getter(constants.GETTER_ENDPOINT_ONE, key).token) {
            return store.action(constants.ACTION_AUTH_SIGN_IN_SHOW);
          }
          router.navigateTo(`/${key}`, true); // href hash #/
        })
      ;
    }

    handleEndpointEdit(key) {
      throw new Error("TODO not support ... :P ");
    }

    handleEndpointRemove(key) {
      Promise
        .resolve()
        .then(() => store.action(constants.ACTION_ENDPOINT_REMOVE, key))
        .catch((err) => {
          // TODO
          debugger;
        })
      ;
    }