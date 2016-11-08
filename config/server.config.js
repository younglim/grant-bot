module.exports = {
  botCredentials: {
    appId: process.env.MICROSOFT_APP_ID || '33571b702ec9b7f8b18afe64d035aa1b8db5feac076ccb58342f878798da81502d5f3991',
    appPassword: process.env.MICROSOFT_APP_PASSWORD || '42163447209bad8fd2c19402ad6ba91ddae6ab89563787'
  },
  environment: (process.env.NODE_ENV || 'development')
};