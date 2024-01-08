
export class SecretConfig {
    public static production = false;

    public static Mongo = {
        host: "localhost",
        port: 27017,
        user: "root",
        password: "HHqgloz68I04ds7392gg",
        database: "emailscom"
    }

    public static Auth = {
        jwtSecret: 'UIi6l373aqi2drnBkZtzsC6mgDNoXetLzXyRlNvWXpldYrIi', // Used to encode JWT tokens
    }
}