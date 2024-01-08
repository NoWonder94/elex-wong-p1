export const httpRoutes = {
  gate: { client: { auth: '/gate/client/auth', exit: '/gate/client/exit' } },
  gm: {
    client: {
      coinTransferIn: '/gm/client/coinTransferIn',
      coinTransferOut: '/gm/client/coinTransferOut',
      getRealtimeInfo: '/gm/client/getRealtimeInfo',
      refreshConfig: '/gm/client/refreshConfig',
      sendPlayerMail: '/gm/client/sendPlayerMail',
      sendServerMail: '/gm/client/sendServerMail'
    }
  },
  resource: {
    client: {
      clientVersionCheck: '/resource/client/clientVersionCheck',
      getDynamicResource: '/resource/client/getDynamicResource',
      getStaticResource: '/resource/client/getStaticResource'
    }
  }
}