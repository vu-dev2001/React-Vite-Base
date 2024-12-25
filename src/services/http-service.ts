import ky from 'ky';

const kyDefault = ky.create({
    prefixUrl: `${import.meta.env['VITE_BACKEND_BASE_URL']}`,
    timeout: 10000,
})

const nonAuthKyInstance = kyDefault.extend({});

const authKyInstance = kyDefault.extend({});

export { nonAuthKyInstance, authKyInstance };
// const kyInstance