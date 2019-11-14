const manifest = (env) => ({
    hostMonitor: ({
        production: '',
        development: 'http://localhost:4020',
    })[env]
});

export default manifest(process.env.NODE_ENV);